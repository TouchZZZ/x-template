import {HeroInfoDO} from "../do/HeroInfoDO";
import * as baseJson from "../../json/hero_base.json";


export class HeroAbility {
    private playerAbilityMap: Map<PlayerID, string[]> = new Map<PlayerID, string[]>();
    private playerChooseHeroMap: Map<PlayerID, HeroInfoDO[]> = new Map<PlayerID, HeroInfoDO[]>();

    constructor() {
        this.initHeroPool();

        // PlayerResource.AddPlayerData
        CustomGameEventManager.RegisterListener('choose_hero', (source, event) => this.heroBeChoose(event));
        CustomGameEventManager.RegisterListener('jj_replace_ability', (source, event) => this.replaceAbility(event));
    }
    private heroBeChoose(event) {
        if(null!=event.name){
            event.name = 'npc_dota_hero_' + event.name;
        }
        //判断英雄，不存在则随机
        let infoList: HeroInfoDO[] = this.playerChooseHeroMap.get(event.PlayerID);

        let heroInfo;
        if (null == event.name) {
            let infoDO = infoList[RandomInt(0, 2)];
            DeepPrintTable(infoDO);
            event.name = infoDO.name;
            event.chooseHeroDeleteAbilityName = infoDO.abList[RandomInt(0, 2)];
            heroInfo = infoDO;
        } else {
            let exsit = false;
            //判断英雄是不是在
            for (const heroInfoDO of infoList) {
                if(heroInfoDO.name == event.name){
                    heroInfo = heroInfoDO;
                    exsit = true;
                    break;
                }
            }
            if(!exsit){
                let infoDO = infoList[RandomInt(0,2)];
                event.name = infoDO.name;
                event.chooseHeroDeleteAbilityName = infoDO.abList[RandomInt(0, 3)];
                heroInfo = infoDO;
            }
        }


        //判断技能
        if(null == event.chooseHeroDeleteAbilityName){
            //要随机
            event.chooseHeroDeleteAbilityName = heroInfo.abList[RandomInt(0,3)];
        }else{
            //判断在不在
            let exsit = false;
            //判断英雄是不是在
            for (const ab of heroInfo.abList) {
                if (ab == event.chooseHeroDeleteAbilityName){
                    exsit = true;
                    break;
                }
            }
            if(!exsit){
                event.chooseHeroDeleteAbilityName = heroInfo.abList[RandomInt(0, 3)];
            }
        }
        let player = PlayerResource.GetPlayer(event.PlayerID);


        //操作，需要选英雄，删技能
        print('最终选择');
        print(event.name);
        print(event.chooseHeroDeleteAbilityName);

        player.SetSelectedHero(event.name);
        // player.GetAssignedHero();
        // print(player.GetAssignedHero());
        Timers.CreateTimer(2, () => {
            let hero: CDOTA_BaseNPC_Hero = player.GetAssignedHero();
            if (!hero) {
                return 3;
            } else {


                hero.RemoveAbility(event.chooseHeroDeleteAbilityName);

                //，在添加技能
                // print('111');
                // print(event);
                // print(event.abilityBig);
                // hero.AddAbility(event.ab1);
                // hero.AddAbility(event.ab2);
                // hero.AddAbility(event.abilityBig);
                this.addAbilityWithCheck(hero, 'ability_test1');
                this.addAbilityWithCheck(hero, 'ability_test2');
                this.addAbilityWithCheck(hero, 'ability_test3');

                //记录下英雄技能
                this.writeAdnSendPlayerHeroAbility(hero, heroInfo, event);

                //打印技能
                // for (let i = 0; i < 35; i++) {
                //     print(hero.GetAbilityByIndex(i)?.GetAbilityName());
                // }

                return;
            }
        });
    }

    private writeAdnSendPlayerHeroAbility(hero: CDOTA_BaseNPC_Hero, heroInfo, event) {

        let playerHeroAbilityList = [];
        let abList: string[] = heroInfo.abList;
        if (abList.length <= 0) {
            return;
        }
        let index = 0;
        for (let i = 0; i < 30; i++) {
            let ability: CDOTABaseAbility = hero.GetAbilityByIndex(i);
            if (ability) {
                let name = ability.GetAbilityName();
                if (abList.includes(name) && name != event.chooseHeroDeleteAbilityName) {
                    playerHeroAbilityList[index++] = name;
                } else if (name.startsWith('ability_test')) {
                    playerHeroAbilityList[index++] = name;
                }
            }
        }
        this.playerAbilityMap.set(event.PlayerID, playerHeroAbilityList);
        print('test!!');
        DeepPrintTable(heroInfo.abList);
        DeepPrintTable(playerHeroAbilityList);
        GameRules.XNetTable.SetPlayerTableValue(event.PlayerID, 'heroInfoTable', 'abilities', { name: playerHeroAbilityList });
    }

    private addAbilityWithCheck(hero: CDOTA_BaseNPC_Hero, ability: string) {
        if (!hero.HasAbility(ability)) {
            hero.AddAbility(ability);
        }
    }

    // private aa(){
    // }


    private initHeroPool() {

        let set: Set<number> = new Set<number>();
        let list: HeroInfoDO[] = [];
        for (let i = 0; i < 15; i++) {
            let number = RandomInt(1, 25);
            while (set.has(number)) {
                number = RandomInt(1, 25);
            }
            set.add(number);
            let hero = new HeroInfoDO();
            hero.name = baseJson[number + '']['name'];
            let abList = [];
            abList[0] = baseJson[number + '']['ab1'];
            abList[1] = baseJson[number + '']['ab2'];
            abList[2] = baseJson[number + '']['ab3'];
            abList[3] = baseJson[number + '']['ab4'];
            hero.ab1 = baseJson[number + '']['ab1'];
            hero.ab2 = baseJson[number + '']['ab2'];
            hero.ab3 = baseJson[number + '']['ab3'];
            hero.ab4 = baseJson[number + '']['ab4'];
            hero.abList = abList;
            list.push(hero);
        }
        for (let i = 0; i < 5; i++) {
            let itemList = [];
            for (let j = 0; j < 3; j++) {
                // @ts-ignore
                itemList[j] = list[i * 3 + j];
            }
            this.playerChooseHeroMap.set(i as PlayerID, itemList);
        }


        // print('fff1');
        // DeepPrintTable(list);
        // for (const heroInfoDO of list) {
        //     print(heroInfoDO.name);
        // }
        // print('result');
        // DeepPrintTable(list);
        GameRules.XNetTable.SetTableValue('commonPool', 'heroPool', {
            choiceHeroList: [
                [list[0], list[1], list[2]],
                [list[3], list[4], list[5]],
                [list[6], list[7], list[8]],
                [list[9], list[10], list[11]],
                [list[12], list[13], list[14]],
            ],
        });
    }


    private replaceAbility(event) {
        let player = PlayerResource.GetPlayer(event.PlayerID);
        let hero: CDOTA_BaseNPC_Hero = player.GetAssignedHero();
        if (!hero.HasAbility(event.inAbilityName)) {
            let oldAbilityStr = event.outAbilityName;
            let newAbilityStr = event.inAbilityName;
            // let oldAbility: CDOTABaseAbility = hero.FindAbilityByName(oldAbilityStr);
            // let index = oldAbility.GetAbilityIndex();
            // // hero.SetAbilityByIndex(inAbilityStr, index);
            // hero.RemoveAbility(oldAbilityStr);
            // hero.RemoveAbilityFromIndexByName(event.outAbilityName);

            let newAbility = hero.AddAbility(newAbilityStr);
            newAbility.SetLevel(1);
            hero.SwapAbilities( oldAbilityStr,newAbilityStr, false, true);
            hero.RemoveAbility(oldAbilityStr);

            //通知变更
            this.notifyAbilityChange(event.PlayerID, oldAbilityStr, newAbilityStr);

            // hero.UnHideAbilityToSlot(event.outAbilityName, event.inAbilityName);
            // for (let i = 0; i < 30; i++) {
            //     let abilityByIndex: CDOTABaseAbility = hero.GetAbilityByIndex(i);
            //     let abilityName = abilityByIndex.GetAbilityName();
            //     if(abilityName == event.outAbilityName){
            //         hero.setab
            //     }
            // }
        }
        // hero.RemoveAbility(event.outAbilityName);
    }

    private notifyAbilityChange(playerId: PlayerID, oldAbilityStr: string, newAbilityStr: string) {
        let abilityList = this.playerAbilityMap.get(playerId);
        for (let i = 0; i < abilityList.length; i++) {
            let str = abilityList[i];
            if( str == oldAbilityStr){
                abilityList[i] = newAbilityStr;
            }
        }
        GameRules.XNetTable.SetPlayerTableValue(playerId, 'heroInfoTable', 'abilities', { name: abilityList });
    }
}
