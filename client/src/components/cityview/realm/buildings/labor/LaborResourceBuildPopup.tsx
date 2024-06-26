import { useEffect, useMemo, useState } from "react";
import { SecondaryPopup } from "../../../../../elements/SecondaryPopup";
import Button from "../../../../../elements/Button";
import { Headline } from "../../../../../elements/Headline";
import { ResourceCost } from "../../../../../elements/ResourceCost";
import { NumberInput } from "../../../../../elements/NumberInput";
import { ResourcesIds, findResourceById, Resource, Guilds } from "@bibliothecadao/eternum";
import { ReactComponent as FishingVillages } from "../../../../../assets/icons/resources/FishingVillages.svg";
import { ReactComponent as Farms } from "../../../../../assets/icons/resources/Farms.svg";
import { ResourceIcon } from "../../../../../elements/ResourceIcon";
import { BuildingsCount } from "../../../../../elements/BuildingsCount";
import clsx from "clsx";
import useRealmStore from "../../../../../hooks/store/useRealmStore";
import { useDojo } from "../../../../../DojoContext";
import { formatSecondsLeftInDaysHours } from "../../labor/laborUtils";
import { soundSelector, useUiSounds } from "../../../../../hooks/useUISound";
import { getComponentValue } from "@dojoengine/recs";
import { divideByPrecision, getEntityIdFromKeys, getPosition, getZone } from "../../../../../utils/utils";
import useBlockchainStore from "../../../../../hooks/store/useBlockchainStore";
import { useGetRealm } from "../../../../../hooks/helpers/useRealm";
import { useLabor } from "../../../../../hooks/helpers/useLabor";
import { LaborAuction } from "../../labor/LaborAuction";
import { LABOR_CONFIG } from "@bibliothecadao/eternum";
import { BuildingLevel } from "./BuildingLevel";
import { useBuildings } from "../../../../../hooks/helpers/useBuildings";

type LaborResourceBuildPopupProps = {
  guild: number;
  resourceId: number;
  onClose: () => void;
};

export const LaborResourceBuildPopup = ({ guild, resourceId, onClose }: LaborResourceBuildPopupProps) => {
  const {
    setup: {
      components: { Resource, Labor },
      systemCalls: { purchase_labor },
    },
    account: { account },
  } = useDojo();

  const realmId = useRealmStore((state) => state.realmId);

  const [missingResources, setMissingResources] = useState<Resource[]>([]);
  const [laborAmount, setLaborAmount] = useState(6);
  const [multiplier, setMultiplier] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { getLaborCost, getLaborAuctionAverageCoefficient } = useLabor();
  const { getLaborBuilding } = useBuildings();

  useEffect(() => {
    setMultiplier(1); // Reset the multiplier to 1 when the resourceId changes
  }, [resourceId]);

  const onMultiplierChange = (value: number) => {
    if (resourceId === 254) {
      setMultiplier(Math.min(value, realm?.rivers || 0));
    } else {
      setMultiplier(Math.min(value, realm?.harbors || 0));
    }
  };

  let realmEntityId = useRealmStore((state) => state.realmEntityId);
  const { realm } = useGetRealm(realmEntityId);

  const nextBlockTimestamp = useBlockchainStore((state) => state.nextBlockTimestamp);

  const isFood = useMemo(() => [254, 255].includes(resourceId), [resourceId]);
  const laborUnits = useMemo(() => (isFood ? 12 : laborAmount), [laborAmount]);
  const resourceInfo = useMemo(() => findResourceById(resourceId), [resourceId]);

  const labor = getComponentValue(Labor, getEntityIdFromKeys([BigInt(realmEntityId), BigInt(resourceId)]));
  const hasLaborLeft = useMemo(() => {
    if (nextBlockTimestamp && labor && labor.balance > nextBlockTimestamp) {
      return true;
    }
    return false;
  }, [nextBlockTimestamp, labor]);

  const building = getLaborBuilding();
  const guildLevel = Number(building?.level || 0);
  const guildDiscount = 0.9 ** guildLevel;

  const position = realmId ? getPosition(realmId) : undefined;
  const zone = position ? getZone(position.x) : undefined;

  const laborAuctionAverageCoefficient = useMemo(() => {
    let coefficient = zone ? getLaborAuctionAverageCoefficient(zone, laborUnits * multiplier) : undefined;
    return coefficient || 1;
  }, [zone, laborUnits, multiplier]);

  const totalDiscount = guildDiscount * laborAuctionAverageCoefficient;

  const costResources = useMemo(() => getLaborCost(resourceId), [resourceId]);

  const getTotalAmount = (
    amount: number,
    isFood: boolean,
    multiplier: number,
    laborAmount: number,
    totalDiscount: number,
  ) => {
    return amount * multiplier * (isFood ? 12 : laborAmount) * totalDiscount;
  };

  const onBuild = async () => {
    setIsLoading(true);
    await purchase_labor({
      signer: account,
      entity_id: realmEntityId,
      resource_type: resourceId,
      labor_units: laborUnits,
      multiplier,
    });
    playLaborSound(resourceId);
    onClose();
  };

  useEffect(() => {
    let missingResources: Resource[] = [];
    costResources.forEach(({ resourceId, amount }) => {
      const realmResource = getComponentValue(
        Resource,
        getEntityIdFromKeys([BigInt(realmEntityId), BigInt(resourceId)]),
      );
      let missingAmount =
        Number(realmResource?.balance || 0) -
        getTotalAmount(Number(amount), isFood, multiplier, laborAmount, totalDiscount);
      if (missingAmount < 0) {
        missingResources.push({
          resourceId,
          amount: missingAmount,
        });
      }
    });
    setMissingResources(missingResources);
  }, [laborAmount, multiplier, costResources]);

  const { play: playFarm } = useUiSounds(soundSelector.buildFarm);
  const { play: playFishingVillage } = useUiSounds(soundSelector.buildFishingVillage);
  const { play: playAddWood } = useUiSounds(soundSelector.addWood);
  const { play: playAddStone } = useUiSounds(soundSelector.addStone);
  const { play: playAddCoal } = useUiSounds(soundSelector.addCoal);
  const { play: playAddCopper } = useUiSounds(soundSelector.addCopper);
  const { play: playAddObsidian } = useUiSounds(soundSelector.addObsidian);
  const { play: playAddSilver } = useUiSounds(soundSelector.addSilver);
  const { play: playAddIronwood } = useUiSounds(soundSelector.addIronwood);
  const { play: playAddColdIron } = useUiSounds(soundSelector.addColdIron);
  const { play: playAddGold } = useUiSounds(soundSelector.addGold);
  const { play: playAddHartwood } = useUiSounds(soundSelector.addHartwood);
  const { play: playAddDiamonds } = useUiSounds(soundSelector.addDiamonds);
  const { play: playAddSapphire } = useUiSounds(soundSelector.addSapphire);
  const { play: playAddRuby } = useUiSounds(soundSelector.addRuby);
  const { play: playAddDeepCrystal } = useUiSounds(soundSelector.addDeepCrystal);
  const { play: playAddIgnium } = useUiSounds(soundSelector.addIgnium);
  const { play: playAddEtherealSilica } = useUiSounds(soundSelector.addEtherealSilica);

  const { play: playAddTrueIce } = useUiSounds(soundSelector.addTrueIce);
  const { play: playAddTwilightQuartz } = useUiSounds(soundSelector.addTwilightQuartz);
  const { play: playAddAlchemicalSilver } = useUiSounds(soundSelector.addAlchemicalSilver);
  const { play: playAddAdamantine } = useUiSounds(soundSelector.addAdamantine);
  const { play: playAddMithral } = useUiSounds(soundSelector.addMithral);
  const { play: playAddDragonhide } = useUiSounds(soundSelector.addDragonhide);

  const playLaborSound = (resourceId: ResourcesIds) => {
    // eslint-disable-next-line sonarjs/no-small-switch
    switch (resourceId) {
      case ResourcesIds.Fish:
        playFishingVillage();
        break;
      case ResourcesIds.Wheat:
        playFarm();
        break;
      case ResourcesIds.Wood:
        playAddWood();
        break;
      case ResourcesIds.Stone:
        playAddStone();
        break;
      case ResourcesIds.Coal:
        playAddCoal();
        break;
      case ResourcesIds.Copper:
        playAddCopper();
        break;
      case ResourcesIds.Obsidian:
        playAddObsidian();
        break;
      case ResourcesIds.Silver:
        playAddSilver();
        break;
      case ResourcesIds.Ironwood:
        playAddIronwood();
        break;
      case ResourcesIds.ColdIron:
        playAddColdIron();
        break;
      case ResourcesIds.Gold:
        playAddGold();
        break;
      case ResourcesIds.Hartwood:
        playAddHartwood();
        break;
      case ResourcesIds.Diamonds:
        playAddDiamonds();
        break;
      case ResourcesIds.Sapphire:
        playAddSapphire();
        break;
      case ResourcesIds.Ruby:
        playAddRuby();
        break;
      case ResourcesIds.DeepCrystal:
        playAddDeepCrystal();
        break;
      case ResourcesIds.Ignium:
        playAddIgnium();
        break;
      case ResourcesIds.EtherealSilica:
        playAddEtherealSilica();
        break;
      case ResourcesIds.TrueIce:
        playAddTrueIce();
        break;
      case ResourcesIds.TwilightQuartz:
        playAddTwilightQuartz();
        break;
      case ResourcesIds.AlchemicalSilver:
        playAddAlchemicalSilver();
        break;
      case ResourcesIds.Adamantine:
        playAddAdamantine();
        break;
      case ResourcesIds.Mithral:
        playAddMithral();
        break;
      case ResourcesIds.Dragonhide:
        playAddDragonhide();
        break;
      default:
        break;
    }
  };

  return (
    <SecondaryPopup name="labor">
      <SecondaryPopup.Head onClose={onClose}>
        <div className="flex items-center space-x-1">
          <div className="mr-0.5">Purchase Labor:</div>
        </div>
      </SecondaryPopup.Head>
      <SecondaryPopup.Body withWrapper width={"376px"}>
        <div className="flex flex-col items-center p-2">
          <Headline>Purchase {resourceInfo?.trait} Labor</Headline>
          <div className="relative flex justify-between w-full mt-1 text-xs text-lightest">
            <div className="flex items-center">
              {!isFood && (
                <>
                  <ResourceIcon className="mr-1" resource={resourceInfo?.trait || ""} size="md" /> {resourceInfo?.trait}
                </>
              )}
              {resourceId === 254 && (
                <div className="flex items-center">
                  <Farms className="mr-1" />
                  <span className="mr-1 font-bold">{`${multiplier}/${realm?.rivers || 0}`}</span> Farms
                </div>
              )}
              {resourceId === 255 && (
                <div className="flex items-center">
                  {/* // DISCUSS: can only be 0, because that is when you can build */}
                  <FishingVillages className="mr-1" />
                  <span className="mr-1 font-bold">{`${multiplier}/${realm?.harbors || 0}`}</span> Fishing Villages
                </div>
              )}
            </div>
            <div className="flex items-center text-white">
              Final Discount: <div className="text-order-brilliance ml-1">×{totalDiscount.toFixed(2)}</div>
            </div>
          </div>
          {isFood && (
            <BuildingsCount
              count={multiplier}
              // note: need to limit to 4 because of temp gas limit
              maxCount={resourceId === 254 ? realm?.rivers || 0 : realm?.harbors || 0}
              className="mt-2"
            />
          )}
          <div className={clsx("relative w-full", isFood ? "mt-2" : "mt-2")}>
            <img
              src={`/images/units/${Guilds[guild - 1]?.toLowerCase()}.png`}
              className="object-cover w-full h-full rounded-[10px] h-[340px]"
            />
            <div className="absolute top-2 left-2 bg-black/90 rounded-[10px] p-3 pb-6 hover:bg-black">
              <LaborAuction />
              <BuildingLevel className="mt-6" />
            </div>
            <div className="flex flex-col p-2 absolute left-2 bottom-2 rounded-[10px] bg-black/90">
              <div className="mb-1 ml-1 italic text-light-pink text-xxs">Cost of Labor:</div>
              <div className="grid grid-cols-4 gap-2">
                {costResources.map(({ resourceId, amount }) => {
                  const missingResource = missingResources.find((resource) => resource.resourceId === resourceId);
                  return (
                    <ResourceCost
                      withTooltip
                      key={resourceId}
                      type="vertical"
                      resourceId={resourceId}
                      className={missingResource ? "text-order-giants" : ""}
                      amount={Number(
                        divideByPrecision(
                          getTotalAmount(Number(amount), isFood, multiplier, laborAmount, totalDiscount),
                        ).toFixed(2),
                      )}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between m-2 text-xxs">
          {!isFood && (
            <div className="flex items-center">
              {/* <div className="italic text-light-pink">Units</div> */}
              {/* note: max 76 for now because of gas, can remove after new contract deployment */}
              <NumberInput className="ml-2 mr-2" value={laborAmount} step={5} onChange={setLaborAmount} max={76} />
              <div className="italic text-gold">
                Creates labor for: <br />
                {formatSecondsLeftInDaysHours(
                  laborAmount * divideByPrecision(LABOR_CONFIG?.base_labor_units * 1000 || 0),
                )}
              </div>
            </div>
          )}
          {isFood && (
            <div className="flex items-center">
              <div className="italic text-light-pink">Amount</div>
              <NumberInput
                className="ml-2 mr-2"
                value={multiplier}
                onChange={onMultiplierChange}
                max={resourceId === 254 ? realm?.rivers || 0 : realm?.harbors || 0}
              />
              <div className="italic text-gold">
                <Button
                  variant="outline"
                  onClick={() => setMultiplier(resourceId === 254 ? realm?.rivers || 0 : realm?.harbors || 0)}
                >
                  Max {resourceId === 254 ? realm?.rivers || 0 : realm?.harbors || 0}
                </Button>
              </div>
            </div>
          )}
          <div className="flex flex-col items-center justify-center">
            <Button
              isLoading={isLoading}
              disabled={missingResources.length > 0 || (isFood && hasLaborLeft)}
              onClick={() => onBuild()}
              variant="primary"
              withoutSound
            >
              Purchase Labor
            </Button>
            {missingResources.length > 0 && <div className="text-xxs text-order-giants/70">Insufficient resources</div>}
            {isFood && hasLaborLeft && <div className="text-xxs text-order-giants/70">Finish 24h cycle</div>}
          </div>
        </div>
      </SecondaryPopup.Body>
    </SecondaryPopup>
  );
};
