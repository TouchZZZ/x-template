import {XNetTable} from "./xnet-table";
import {HeroInfoDO} from "./do/HeroInfoDO";
import * as myJson from "./../json/hero_base.json";
import {AbilityShop} from "./ability/AbilityShop";
import {HeroAbility} from "./ability/HeroAbility";

export class GameConfig {
    constructor() {
        SendToServerConsole('dota_max_physical_items_purchase_limit 9999'); // 用来解决物品数量限制问题
        SendToServerConsole('unbindall');
        print('aaa');
        // SendToServerConsole('bind f dota_ability_quickcast 0 1');
        SendToConsole('bind f dota_ability_quickcast 0 1');
        // SendToServerConsole('dota_create_unit npc_dota_hero_axe enemy');

        GameRules.SetCustomGameSetupAutoLaunchDelay(0); // 游戏设置时间（默认的游戏设置是最开始的队伍分配）
        GameRules.SetCustomGameSetupRemainingTime(0); // 游戏设置剩余时间
        GameRules.SetCustomGameSetupTimeout(1); // 游戏设置阶段超时
        GameRules.SetHeroSelectionTime(500); // 选择英雄阶段的持续时间
        GameRules.SetShowcaseTime(0); // 选完英雄的展示时间
        GameRules.SetStrategyTime(0);
        GameRules.SetPreGameTime(0); // 进入游戏后号角吹响前的准备时间
        GameRules.SetPostGameTime(45); // 游戏结束后时长
        GameRules.SetSameHeroSelectionEnabled(true); // 是否允许选择相同英雄
        GameRules.SetStartingGold(600); // 设置初始金钱
        GameRules.SetGoldTickTime(0); // 设置工资发放间隔
        GameRules.SetGoldPerTick(0); // 设置工资发放数额
        GameRules.SetHeroRespawnEnabled(true); // 是否允许英雄重生
        GameRules.SetCustomGameAllowMusicAtGameStart(false); // 是否允许游戏开始时的音乐
        GameRules.SetCustomGameAllowHeroPickMusic(false); // 是否允许英雄选择阶段的音乐
        GameRules.SetCustomGameAllowBattleMusic(false); // 是否允许战斗阶段音乐
        GameRules.SetUseUniversalShopMode(true); // 是否启用全地图商店模式（在基地也可以购买神秘商店的物品）* 不是在任何地方都可以购买商店物品的
        GameRules.SetHideKillMessageHeaders(true); // 是否隐藏顶部的英雄击杀信息

        // GameRules.SetCustomGameTeamMaxPlayers(DotaTeam.NEUTRALS, 4);
        // GameRules.SetCustomGameTeamMaxPlayers(DotaTeam.NOTEAM, 4);

        // GameRules.SetCustomGameSetupRemainingTime(-1);
        // GameRules.SetCustomGameSetupAutoLaunchDelay(10);
        // GameRules.AddBotPlayerWithEntityScript('npc_dota_hero_warlock', '玩家1', DotaTeam.GOODGUYS, 'maps/prefabs/basic_entities.vmap', true);

        const game: CDOTABaseGameMode = GameRules.GetGameModeEntity();
        game.SetRemoveIllusionsOnDeath(true); // 是否在英雄死亡的时候移除幻象
        game.SetSelectionGoldPenaltyEnabled(false); // 是否启用选择英雄时的金钱惩罚（超时每秒扣钱）
        game.SetLoseGoldOnDeath(false); // 是否在英雄死亡时扣除金钱
        game.SetBuybackEnabled(false); // 是否允许买活
        game.SetDaynightCycleDisabled(true); // 是否禁用白天黑夜循环
        game.SetForceRightClickAttackDisabled(true); // 是否禁用右键攻击
        game.SetHudCombatEventsDisabled(true); // 是否禁用战斗事件（左下角的战斗消息）
        // game.SetCustomGameForceHero(`npc_dota_hero_phoenix`); // 设置强制英雄（会直接跳过英雄选择阶段并直接为所有玩家选择这个英雄）
        game.SetUseCustomHeroLevels(true); // 是否启用自定义英雄等级
        game.SetCustomHeroMaxLevel(1); // 设置自定义英雄最大等级
        game.SetCustomXPRequiredToReachNextLevel({
            // 设置自定义英雄每个等级所需经验，这里的经验是升级到这一级所需要的*总经验）
            1: 0,
        });
        game.SetDaynightCycleDisabled(true); // 是否禁用白天黑夜循环
        game.SetDeathOverlayDisabled(true); // 是否禁用死亡遮罩（灰色的遮罩）
        game.SetFogOfWarDisabled(true);

        // 设置自定义的队伍人数上限，这里的设置是10个队伍，每个队伍1人
        GameRules.SetCustomGameTeamMaxPlayers(DotaTeam.GOODGUYS, 1);
        GameRules.SetCustomGameTeamMaxPlayers(DotaTeam.BADGUYS, 1);
        for (let team = DotaTeam.CUSTOM_1; team <= DotaTeam.CUSTOM_8; ++team) {
            GameRules.SetCustomGameTeamMaxPlayers(team, 1);
        }
        // CreateUnitByName('npc_dota_hero_mirana', Vector(0, 0, 128), true, null, null, DotaTeam.BADGUYS);

        ListenToGameEvent('npc_spawned', event => this.OnNpcSpawned(event), undefined);

        //初始化随机三个英雄池，并传给前端
        // this.choiceHero();
        // print(myJson['npc_dota_hero_abaddon']);
        // print(list);
        // let list: HeroInfoDO[] = [];
        // Timers.CreateTimer(2, () => {
        //     print('gogo');
        //     game.SetCustomGameForceHero(`npc_dota_hero_phoenix`);
        //     // return 3;
        // });
        // DeepPrintTable(myJson.npc_dota_hero_abaddon);

        //注册类
        new AbilityShop();
        new HeroAbility();
    }

    private choiceHero() {
        // let heroList = LoadKeyValues('scripts/npc/hero_base.txt');
        let index = 0;
        let set: Set<number> = new Set<number>();
        print('--------------');

        let list: HeroInfoDO[] = [];
        // for (const [k, v] of pairs(heroList)) {
        //     allList.put(k, v);
        // }
        for (let i = 0; i < 15; i++) {
            let number = RandomInt(1, 25);
            while (set.has(number)) {
                number = RandomInt(1, 25);
            }
            set.add(number);
            let hero = new HeroInfoDO();
            print(number);
            hero.name = myJson[number + '']['name'];
            hero.ab1 = myJson[number + '']['ab1'];
            hero.ab2 = myJson[number + '']['ab2'];
            hero.ab3 = myJson[number + '']['ab3'];
            hero.ab4 = myJson[number + '']['ab4'];
            list.push(hero);
        }

        // let hero = new HeroInfoDO();
        // hero.name = k;
        // hero.ab1 = v['ab1'];
        // hero.ab2 = v['ab2'];
        // hero.ab3 = v['ab3'];
        // hero.ab4 = v['ab4'];
        // list.push(hero);
        // if (set.has(index)) {
        //
        // }
        // index++;

        // GameRules.XNetTable.SetTableValue('heroTable', 'choiceHero', {
        //     choiceHeroList: [
        //         [list[0], list[1], list[2]],
        //         [list[3], list[4], list[5]],
        //         [list[6], list[7], list[8]],
        //         [list[9], list[10], list[11]],
        //         [list[12], list[13], list[14]],
        //     ],
        // });
    }

    private OnNpcSpawned(event: NpcSpawnedEvent) {
        const unit = EntIndexToHScript(event.entindex);
        if (!unit) return;
        print(unit.GetName());
        if (unit.IsBaseNPC()) {
            // unit.AddAbility('skywrath_mage_arcane_bolt');
            // unit.AddAbility('skywrath_mage_concussive_shot');
            // unit.AddAbility('lone_druid_spirit_bear');
            if (unit.IsHero()) {
                unit1 = unit;
            }
            // unit.AddAbility('sven_storm_bolt_lua');
        }

    }

}

let unit1: CDOTA_BaseNPC_Hero;
let ability1: string;
let ability2: string;
CustomGameEventManager.RegisterListener('add', (source, event) => {
    // if (ability1 && unit1.HasAbility(ability1)) {
    //     unit1.RemoveAbility(ability1);
    //     unit1.SetAbilityPoints(1);
    // }
    // const hasAbility: boolean = unit1.HasAbility(event.name);
    // if (!hasAbility) {


    let s = GetAbilityTextureNameForAbility(event.name);
    let player = PlayerResource.GetPlayer(event.PlayerID);
    let npcHero: CDOTA_BaseNPC_Hero = player.GetAssignedHero();
    // npcHero.FindAbilityByName()
    let addAbility = npcHero.AddAbility(event.name);
    for (let i = 0; i < 15; i++) {
        print(npcHero.GetAbilityByIndex(i)?.GetName());
    }

    // npcHero.RemoveAbility(event.name);
    // npcHero.UnHideAbilityToSlot(addAbility, 4);
    npcHero.SwapAbilities('ability_test2', event.name, false, true);
        // unit1.AddAbility(event.name);
        // unit1.FindAbilityByName(event.name).SetLevel(1);
        // ability1 = event.name;
    // }
});
CustomGameEventManager.RegisterListener('remove', (source, event) => {
    if (ability2 && unit1.HasAbility(ability2)) {
        unit1.RemoveAbility(ability2);
    }
    const hasAbility: boolean = unit1.HasAbility(event.name);
    if (!hasAbility) {
        unit1.AddAbility(event.name);
        ability2 = event.name;
    }
});
// CustomGameEventManager.RegisterListener('choose_hero', (source, event) => {
// //     //判断是否为空，为空则随机一个数据
//
//     print('???');
//     const game: CDOTABaseGameMode = GameRules.GetGameModeEntity();
//     let player = PlayerResource.GetPlayer(event.PlayerID);
//     // player.SetSelectedHero('npc_dota_hero_death_prophet');
//     player.SetSelectedHero('npc_dota_hero_razor' );
//     let hero: CDOTA_BaseNPC_Hero = player.GetAssignedHero();
//
//
//
//     // let hero: CDOTA_BaseNPC_Hero = player.GetAssignedHero();
//     // print(player.GetAssignedHero());
//     Timers.CreateTimer(2, () => {
//         print('gogo');
//         print(player.GetAssignedHero());
//         let hero: CDOTA_BaseNPC_Hero = player.GetAssignedHero();
//         if (hero) {
//             //先删除左右技能
//             for (let i = 0; i < 10; i++) {
//                 let deleteName = hero.GetAbilityByIndex(i).GetName();
//                 if (deleteName) {
//                     hero.RemoveAbility(deleteName);
//                 }
//             }
//
//             //，在添加技能
//             print(event);
//             print(event.abilityBig);
//             hero.AddAbility(event.ab1);
//             hero.AddAbility(event.ab2);
//             hero.AddAbility(event.abilityBig);
//             hero.AddAbility('ability_test1');
//             hero.AddAbility('ability_test2');
//             hero.AddAbility('ability_test3');
//
//             // let name = hero.GetAbilityByIndex(1).GetName();
//             // let a1: CDOTABaseAbility = hero.GetAbilityByIndex(0);
//             // print('添加技能');
//             // hero.AddAbility('ability_test');
//             // // Timers.CreateTimer(3, () => {
//             // //     // print('gogo');
//             // //     // a1.StartCooldown(a1.GetCooldownTime());
//             // //     return 3;
//             // // });
//             // print(name);
//             // print(hero.HasAbility(name));
//             // hero.RemoveAbility(name);
//             return null;
//         }
//         return 3;
//     });
//     // hero.RemoveAbility(hero.GetAbilityByIndex(1).GetName());
//     // CustomUI.DynamicHud_SetVisible(-1, 'ChooseHeroContainer', true);
//     // GameUI.
//     // game.SetCustomGameForceHero('npc_dota_hero_' + event.name);
//     // PlayerResource.ReplaceHeroWith(event.PlayerID, 'npc_dota_hero_' + event.name, 1, 1);
//     // game.SetCustomGameForceHero(`npc_dota_hero_warlock`);
//     // game.SetDraftingHeroPickSelectTimeOverride()
//     // GameRules.SetSameHeroSelectionEnabled(false);
//     // GameRules.FinishCustomGameSetup();
//     // GameRules.SetHeroSelectionTime(20);
//     // CustomGameEventManager.Send_ServerToAllClients('dota_game_state_change', { old_state: 2, new_state: 3 });
//     // GameRules.ResetGameTime();
//     // GameRules.SetShowcaseTime(1);
//     // GameRules.SetPreGameTime(1);
//     // GameRules.SetHeroSelectionTime()
// });
// let object1 = LoadKeyValues('scripts/npc/herolist.txt');
// print('delete!!');
// print(next(object, 2));
// print(LuaTableGet);
// for (const [k, v] of pairs(object)) {
//     print(v);
//     print('--------');
// }
// DeepPrintTable(object);
// DeepPrintTable(object1);
// GameRules.XNetTable.SetTableValue()
CustomGameEventManager.RegisterListener('hero_init_ready', (source, event) => {
    // print('hero_init_ready');
    CustomGameEventManager.Send_ServerToAllClients('hero_init', { name: ['npc_dota_hero_zuus', 'npc_dota_hero_warlock'] });
});
