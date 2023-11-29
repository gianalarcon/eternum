#[dojo::contract]
mod config_systems {
    use eternum::alias::ID;

    use eternum::models::labor_auction::LaborAuction;
    use eternum::models::bank::{Bank, BankSwapResourceCost, BankAuction};
    use eternum::models::config::{
        LaborCostResources, LaborCostAmount, LaborConfig,CapacityConfig, 
        RoadConfig, SpeedConfig, TravelConfig, WeightConfig,WorldConfig,
        SoldierConfig, HealthConfig, AttackConfig, DefenceConfig, CombatConfig,
        LevelingConfig
    };

    use eternum::systems::config::interface::{
        IWorldConfig, IWeightConfig, ICapacityConfig, ILaborConfig, 
        ITransportConfig, IHyperstructureConfig, ICombatConfig,
        ILevelingConfig, IBankConfig
    };

    use eternum::constants::{
        WORLD_CONFIG_ID, LABOR_CONFIG_ID, TRANSPORT_CONFIG_ID,
        ROAD_CONFIG_ID, SOLDIER_ENTITY_TYPE, COMBAT_CONFIG_ID, 
        LEVELING_CONFIG_ID
    };

    use eternum::models::hyperstructure::HyperStructure;
    use eternum::models::resources::ResourceCost;
    use eternum::models::position::{Position,PositionTrait, Coord};

    #[external(v0)]
    impl WorldConfigImpl of IWorldConfig<ContractState> {
        fn set_world_config(
            self: @ContractState, 
            world: IWorldDispatcher, 
            realm_l2_contract: starknet::ContractAddress
        ) {
            set!(
                world,
                (WorldConfig {
                    config_id: WORLD_CONFIG_ID,
                    realm_l2_contract
                })
            );
        }
    }



    #[external(v0)]
    impl CapacityConfigImpl of ICapacityConfig<ContractState> {
        fn set_capacity_config(
            self: @ContractState, 
            world: IWorldDispatcher, 
            entity_type: u128, 
            weight_gram: u128
        ) {
            set!(world, (
                CapacityConfig {
                    config_id: WORLD_CONFIG_ID,
                    carry_capacity_config_id: entity_type,
                    entity_type,
                    weight_gram,
                }
            ));
        }
    }

    #[external(v0)]
    impl WeightConfigImpl of IWeightConfig<ContractState> {
        fn set_weight_config(
            self: @ContractState, 
            world: IWorldDispatcher, 
            entity_type: u128, 
            weight_gram: u128
        ) {
            set!(
                world,
                (WeightConfig {
                    config_id: WORLD_CONFIG_ID,
                    weight_config_id: entity_type,
                    entity_type,
                    weight_gram,
                })
            );
        }
    }


    
    #[external(v0)]
    impl CombatConfigImpl of ICombatConfig<ContractState> {

        fn set_combat_config(
            self: @ContractState, 
            world: IWorldDispatcher, 
            config_id: u128, 
            stealing_trial_count: u32
        ) {
            set!(
                world,
                (CombatConfig {
                    config_id,
                    stealing_trial_count
                })
            );
        }


        fn set_soldier_config(
            self: @ContractState, 
            world: IWorldDispatcher, 
            resource_costs: Span<(u8, u128)>,
            wheat_burn_per_soldier: u128,
            fish_burn_per_soldier: u128
        ) {
            let resource_cost_id = world.uuid().into();
            let mut index = 0;
            loop {
               
                if index == resource_costs.len() {
                    break;
                }
                let (resource_type, resource_amount) 
                    = *resource_costs.at(index);
                set!(world, (
                    ResourceCost {
                        entity_id: resource_cost_id,
                        index,
                        resource_type,
                        amount: resource_amount
                    }
                ));

                index += 1;
            };
            set!(
                world,
                (SoldierConfig {
                    config_id: SOLDIER_ENTITY_TYPE,
                    resource_cost_id,
                    resource_cost_count: resource_costs.len(),
                    wheat_burn_per_soldier,
                    fish_burn_per_soldier
                })
            );
        }

        fn set_health_config(
            self: @ContractState, 
            world: IWorldDispatcher, 
            entity_type: u128, 
            resource_costs: Span<(u8, u128)>,
            max_value: u128
        ) {
            let resource_cost_id = world.uuid().into();
            let mut index = 0;
            loop {
               
                if index == resource_costs.len() {
                    break;
                }
                let (resource_type, resource_amount) 
                    = *resource_costs.at(index);
                set!(world, (
                    ResourceCost {
                        entity_id: resource_cost_id,
                        index,
                        resource_type,
                        amount: resource_amount
                    }
                ));

                index += 1;
            };

            set!(
                world,
                (HealthConfig {
                    entity_type,
                    resource_cost_id,
                    resource_cost_count: resource_costs.len(),
                    max_value
                })
            );
        }

        fn set_attack_config(
            self: @ContractState, 
            world: IWorldDispatcher, 
            entity_type: u128, 
            max_value: u128
        ) {
            set!(
                world,
                (AttackConfig {
                    entity_type,
                    max_value
                })
            );
        }


        fn set_defence_config(
            self: @ContractState, 
            world: IWorldDispatcher, 
            entity_type: u128, 
            max_value: u128
        ) {
            set!(
                world,
                (DefenceConfig {
                    entity_type,
                    max_value
                })
            );
        }
    }

    #[external(v0)]
    impl LevelingConfigImpl of ILevelingConfig<ContractState> {
        fn set_leveling_config(
            self: @ContractState, 
            world: IWorldDispatcher, 
            decay_scaled: u128,
            cost_percentage_scaled: u128,
            base_multiplier: u128,
            wheat_base_amount: u128,
            fish_base_amount: u128,
            resource_1_costs: Span<(u8, u128)>,
            resource_2_costs: Span<(u8, u128)>,
            resource_3_costs: Span<(u8, u128)>,
        ) {
            let resource_1_cost_id = world.uuid().into();
            let mut index = 0;
            loop {
               
                if index == resource_1_costs.len() {
                    break;
                }
                let (resource_type, resource_amount) 
                    = *resource_1_costs.at(index);
                set!(world, (
                    ResourceCost {
                        entity_id: resource_1_cost_id,
                        index,
                        resource_type,
                        amount: resource_amount
                    }
                ));

                index += 1;
            };


            let resource_2_cost_id = world.uuid().into();
            let mut index = 0;
            loop {
               
                if index == resource_2_costs.len() {
                    break;
                }
                let (resource_type, resource_amount) 
                    = *resource_2_costs.at(index);
                set!(world, (
                    ResourceCost {
                        entity_id: resource_2_cost_id,
                        index,
                        resource_type,
                        amount: resource_amount
                    }
                ));

                index += 1;
            };


            let resource_3_cost_id = world.uuid().into();
            let mut index = 0;
            loop {
               
                if index == resource_3_costs.len() {
                    break;
                }
                let (resource_type, resource_amount) 
                    = *resource_3_costs.at(index);
                set!(world, (
                    ResourceCost {
                        entity_id: resource_3_cost_id,
                        index,
                        resource_type,
                        amount: resource_amount
                    }
                ));

                index += 1;
            };


            set!(
                world,
                (LevelingConfig {
                    config_id: LEVELING_CONFIG_ID,
                    wheat_base_amount,
                    fish_base_amount,
                    resource_1_cost_id,
                    resource_2_cost_id,
                    resource_3_cost_id,
                    resource_1_cost_count: resource_1_costs.len(),
                    resource_2_cost_count: resource_2_costs.len(),
                    resource_3_cost_count: resource_3_costs.len(),
                    decay_scaled,
                    cost_percentage_scaled,
                    base_multiplier,
                })
            );
        }
    }



    #[external(v0)]
    impl LaborConfigImpl of ILaborConfig<ContractState> {
        fn set_labor_cost_resources(
            self: @ContractState, 
            world: IWorldDispatcher, 
            resource_type_labor: felt252, 
            resource_types_packed: u128, 
            resource_types_count: u8
        ) {
            // set cost of creating labor for resource id 1 
            // to only resource id 1 cost
            set!(
                world,
                (LaborCostResources {
                    resource_type_labor, 
                    resource_types_packed, 
                    resource_types_count
                })
            );
        }


        fn set_labor_cost_amount(
            self: @ContractState, 
            world: IWorldDispatcher, 
            resource_type_labor: felt252, 
            resource_type_cost: felt252, 
            resource_type_value: u128
        ) {
            set!(
                world,
                (LaborCostAmount {
                    resource_type_labor, 
                    resource_type_cost, 
                    value: resource_type_value
                })
            );
        }


        fn set_labor_config(
            self: @ContractState, 
            world: IWorldDispatcher, 
            base_labor_units: u64, 
            base_resources_per_cycle: u128, 
            base_food_per_cycle: u128
        ) {
            // set labor config
            set!(
                world,
                (LaborConfig {
                    config_id: LABOR_CONFIG_ID,
                    base_labor_units,
                    base_resources_per_cycle,
                    base_food_per_cycle
                })
            );
        }


        fn set_labor_auction(
            self: @ContractState, 
            world: IWorldDispatcher, 
            decay_constant: u128, 
            per_time_unit: u128, 
            price_update_interval: u128
        ) {
            let start_time = starknet::get_block_timestamp();

            let mut zone: u8 = 1;

            loop {
                if zone > 10 {
                    break;
                }

                set!(world, (
                    LaborAuction {
                        zone,
                        decay_constant_mag: decay_constant,
                        decay_constant_sign: false,
                        per_time_unit,
                        start_time,
                        sold: 0,
                        price_update_interval,
                    }
                ));

                zone += 1;
            };
        }

    }




    #[external(v0)]
    impl TransportConfigImpl of ITransportConfig<ContractState> {
        fn set_road_config(
            self: @ContractState, 
            world: IWorldDispatcher, 
            fee_resource_type: u8, 
            fee_amount: u128, 
            speed_up_by: u64
        ) {
            set!(
                world,
                (RoadConfig {
                    config_id: ROAD_CONFIG_ID,
                    fee_resource_type,
                    fee_amount,
                    speed_up_by
                })
            );
        }


        fn set_speed_config(
            self: @ContractState, 
            world: IWorldDispatcher, 
            entity_type: u128, 
            sec_per_km: u16
        ) {
            set!(
                world,
                (SpeedConfig {
                    config_id: WORLD_CONFIG_ID,
                    speed_config_id: entity_type,
                    entity_type,
                    sec_per_km,
                })
            );
        }


        fn set_travel_config(
            self: @ContractState, 
            world: IWorldDispatcher, 
            free_transport_per_city: u128
        ) {

            set!(
                world,
                (TravelConfig {
                    config_id: TRANSPORT_CONFIG_ID,
                    free_transport_per_city
                })
            );

        }
    }



    #[external(v0)]
    impl HyperstructureConfigImpl of IHyperstructureConfig<ContractState> {

        fn create_hyperstructure(
            self: @ContractState,
            world: IWorldDispatcher,
            hyperstructure_type: u8,
            initialization_resources: Span<(u8, u128)>,
            construction_resources: Span<(u8, u128)>,
            coord: Coord
        ) -> ID {
            let mut initialization_resources = initialization_resources;
            let mut construction_resources = construction_resources;
        
            let initialization_resource_count = initialization_resources.len();
            assert(initialization_resource_count > 0, 'resources must not be empty');

            let construction_resource_count = construction_resources.len();
            assert(construction_resource_count > 0, 'resources must not be empty');

            // create initialization resource cost components
            let initialization_resource_id: ID = world.uuid().into();
            let mut index = 0;
            loop {
                match initialization_resources.pop_front() {
                    Option::Some((resource_type, resource_amount)) => {
                        assert(*resource_amount > 0, 'amount must not be 0');

                        set!(world, (
                            ResourceCost {
                                entity_id: initialization_resource_id,
                                index,
                                resource_type: *resource_type,
                                amount: *resource_amount
                            }
                        ));

                        index += 1;
                    },
                    Option::None => {break;}
                };
            };


            // create construction resource cost components
            let construction_resource_id: ID = world.uuid().into();
            let mut index = 0;
            loop {
                match construction_resources.pop_front() {
                    Option::Some((resource_type, resource_amount)) => {
                        assert(*resource_amount > 0, 'amount must not be 0');

                        set!(world, (
                            ResourceCost {
                                entity_id: construction_resource_id,
                                index,
                                resource_type: *resource_type,
                                amount: *resource_amount
                            }
                        ));

                        index += 1;
                    },
                    Option::None => {break;}
                };
            };


            let hyperstructure_id: ID = world.uuid().into();

            set!(world, (
                HyperStructure {
                    entity_id: hyperstructure_id,
                    hyperstructure_type,
                    initialization_resource_id,
                    initialization_resource_count,
                    construction_resource_id,
                    construction_resource_count,
                    initialized_at: 0,
                    completed_at: 0,
                    coord_x: coord.x,
                    coord_y: coord.y
                }
            ));  

            hyperstructure_id 
                
        }

    }


    #[external(v0)]
    impl BankConfigImpl of IBankConfig<ContractState> {

        fn create_bank(
            self: @ContractState,
            world: IWorldDispatcher,
            coord: Coord,
            swap_cost_resources: Span<(u8, Span<(u8, u128)>)>,
        ) -> ID {
      
            let bank_id: ID = world.uuid().into();

            // add swap cost
            let mut swap_cost_resources = swap_cost_resources;
            loop {
                match swap_cost_resources.pop_front() {
                    Option::Some((exchanged_resource_type, swap_resources)) => {

                        let swap_resource_cost_id: ID = world.uuid().into();
                        let swap_resources_count = (*swap_resources).len();
                        
                        let mut index = 0;
                        let mut swap_resources = * swap_resources;
                        loop {
                            match swap_resources.pop_front() {
                                Option::Some((resource_type, resource_amount)) => {
                                    assert(*resource_amount > 0, 'amount must not be 0');

                                    set!(world, (
                                        ResourceCost {
                                            entity_id: swap_resource_cost_id,
                                            index,
                                            resource_type: *resource_type,
                                            amount: *resource_amount
                                        }
                                    ));

                                    index += 1;
                                },
                                Option::None => {break;}
                            };
                        };
                        set!(world, (
                            BankSwapResourceCost {
                                resource_type: *exchanged_resource_type,
                                resource_cost_id: swap_resource_cost_id,
                                resource_cost_count: swap_resources_count
                            }
                        ));
                    },
                    Option::None => {break;}
                }
            };

            set!(world, (
                Bank {
                    entity_id: bank_id,
                    exists: true
                },
                Position {
                    entity_id: bank_id,
                    x: coord.x,
                    y: coord.y
                }
            ));  
            bank_id 
                
        }



        fn set_bank_auction(
            self: @ContractState,
            world: IWorldDispatcher,
            bank_id: u128, 
            resource_types: Span<u8>,
            decay_constant: u128,
            per_time_unit: u128,
            price_update_interval: u128,
        ) {

            let start_time = starknet::get_block_timestamp();

            let bank = get!(world, (bank_id), Bank);
            assert(bank.exists == true, 'no bank');

            let mut index = 0;
            loop {
                if index == resource_types.len() {
                    break;
                }

                set!(world, (
                    BankAuction {
                        bank_id,
                        resource_type: *resource_types.at(index),
                        decay_constant_mag: decay_constant,
                        decay_constant_sign: false,
                        per_time_unit,
                        start_time,
                        sold: 0,
                        price_update_interval,
                    }
                ));

                index += 1;
        };       
        }
    }
}