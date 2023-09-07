import { EntityIndex, HasValue, NotValue, getComponentValue, runQuery } from "@latticexyz/recs";
import { useDojo } from "../../DojoContext";
import { Resource } from "../../types";
import { MarketInterface, ResourceInterface } from "../graphql/useGraphQLQueries";
import { useEffect, useMemo, useState } from "react";
import useRealmStore from "../store/useRealmStore";
import { getEntityIdFromKeys } from "../../utils/utils";
import { useEntityQuery } from "@dojoengine/react";
import { HIGH_ENTITY_ID } from "../../dojo/createOptimisticSystemCalls";
import { getRealm } from "../../components/cityview/realm/SettleRealmComponent";
import { calculateRatio } from "../../components/cityview/realm/trade/Market/MarketOffer";

export function useTrade() {
  const {
    setup: {
      components: { OrderResource, FungibleEntities, Resource, Trade },
    },
  } = useDojo();

  const getTradeResources = (orderId: number): Resource[] => {
    const fungibleEntities = getComponentValue(FungibleEntities, orderId as EntityIndex);
    if (!fungibleEntities) return [];
    let resources: Resource[] = [];
    for (let i = 0; i < fungibleEntities.count; i++) {
      let entityId = getEntityIdFromKeys([BigInt(orderId), BigInt(fungibleEntities.key), BigInt(i)]);
      const resource = getComponentValue(OrderResource, entityId);
      if (resource) {
        resources.push({
          resourceId: resource.resource_type,
          amount: resource.balance,
        });
      }
    }
    return resources;
  };

  const getCounterpartyOrderId = (orderId: number): number | undefined => {
    const tradeIfMaker = Array.from(runQuery([HasValue(Trade, { maker_order_id: orderId })]));
    const tradeIfTaker = Array.from(runQuery([HasValue(Trade, { taker_order_id: orderId })]));
    if (tradeIfMaker.length > 0) {
      let trade = getComponentValue(Trade, tradeIfMaker[0]);
      return trade?.taker_order_id;
    } else if (tradeIfTaker.length > 0) {
      let trade = getComponentValue(Trade, tradeIfTaker[0]);
      return trade?.maker_order_id;
    } else {
      return undefined;
    }
  };

  const canAcceptOffer = ({
    realmEntityId,
    resourcesGive,
  }: {
    realmEntityId: number;
    resourcesGive: ResourceInterface[];
  }): boolean => {
    let canAccept = true;
    Object.values(resourcesGive).forEach((resource) => {
      const realmResource = getComponentValue(
        Resource,
        getEntityIdFromKeys([BigInt(realmEntityId), BigInt(resource.resourceId)]),
      );
      if (realmResource === undefined || realmResource.balance < resource.amount) {
        canAccept = false;
      }
    });
    return canAccept;
  };

  return { getTradeResources, getCounterpartyOrderId, canAcceptOffer };
}

// TODO: sorting here
export function useGetMyOffers() {
  const {
    setup: {
      components: { Status, Trade },
    },
  } = useDojo();

  const { realmEntityId } = useRealmStore();

  const [myOffers, setMyOffers] = useState<MarketInterface[]>([]);

  const entityIds = useEntityQuery([HasValue(Status, { value: 0 }), HasValue(Trade, { maker_id: realmEntityId })]);

  const { getTradeResources } = useTrade();

  useMemo(() => {
    const optimisticTradeId = entityIds.indexOf(HIGH_ENTITY_ID as EntityIndex);
    const trades = entityIds
      // avoid having optimistic and real trade at the same time
      .slice(0, optimisticTradeId === -1 ? entityIds.length + 1 : optimisticTradeId + 1)
      .map((tradeId) => {
        let trade = getComponentValue(Trade, tradeId);
        if (trade) {
          const resourcesGet = getTradeResources(trade.taker_order_id);
          const resourcesGive = getTradeResources(trade.maker_order_id);
          return {
            tradeId,
            makerId: trade.maker_id,
            makerOrder: getRealm(trade.maker_id).order,
            makerOrderId: trade.maker_order_id,
            takerOrderId: trade.taker_order_id,
            expiresAt: trade.expires_at,
            resourcesGet,
            resourcesGive,
            canAccept: false,
            ratio: calculateRatio(resourcesGive, resourcesGet),
          } as MarketInterface;
        }
      })
      .filter(Boolean)
      // TODO: change the sorting here
      .sort((a, b) => b!.tradeId - a!.tradeId) as MarketInterface[];
    setMyOffers(trades);
    // only recompute when different number of orders
  }, [entityIds]);

  return {
    myOffers,
  };
}

export function useGetMarket() {
  const {
    setup: {
      components: { Status, Trade },
    },
  } = useDojo();

  const realmEntityId = useRealmStore((state) => state.realmEntityId);

  const [market, setMarket] = useState<MarketInterface[]>([]);

  const entityIds = useEntityQuery([HasValue(Status, { value: 0 }), NotValue(Trade, { maker_id: realmEntityId })]);

  const { getTradeResources, canAcceptOffer } = useTrade();

  useEffect(() => {
    const trades = entityIds
      .map((tradeId) => {
        let trade = getComponentValue(Trade, tradeId);
        if (trade) {
          const resourcesGet = getTradeResources(trade.maker_order_id);
          const resourcesGive = getTradeResources(trade.taker_order_id);
          return {
            tradeId,
            makerId: trade.maker_id,
            makerOrder: getRealm(trade.maker_id).order,
            makerOrderId: trade.maker_order_id,
            takerOrderId: trade.taker_order_id,
            expiresAt: trade.expires_at,
            resourcesGet,
            resourcesGive,
            canAccept: canAcceptOffer({ realmEntityId, resourcesGive }),
            ratio: calculateRatio(resourcesGive, resourcesGet),
          } as MarketInterface;
        }
      })
      .filter(Boolean)
      // TODO: change the sorting here
      .sort((a, b) => b!.tradeId - a!.tradeId) as MarketInterface[];
    setMarket(trades);
  }, [entityIds]);

  return {
    market,
  };
}
