import {HeroInfoDO} from "../do/HeroInfoDO";
import * as myJson from "../../json/hero_base.json";


export class HeroAbility {
    private playerHeroMap: Map<PlayerID, string> = new Map<PlayerID, string>();
    private playerChooseHeroMap: Map<PlayerID, HeroInfoDO[]> = new Map<PlayerID, HeroInfoDO[]>();

    constructor() {
        print('???');
        this.choiceHero();
    }
    // private aa(){
    // }


    private choiceHero() {
        let set: Set<number> = new Set<number>();
        let list: HeroInfoDO[] = [];
        for (let i = 0; i < 15; i++) {
            let number = RandomInt(1, 25);
            while (set.has(number)) {
                number = RandomInt(1, 25);
            }
            set.add(number);
            let hero = new HeroInfoDO();
            hero.name = myJson[number + '']['name'];
            hero.ab1 = myJson[number + '']['ab1'];
            hero.ab2 = myJson[number + '']['ab2'];
            hero.ab3 = myJson[number + '']['ab3'];
            hero.ab4 = myJson[number + '']['ab4'];
            list.push(hero);
        }
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 3; j++) {
                // @ts-ignore
                this.playerChooseHeroMap.set(i, list[3 * i + j]);
            }
        }
       
        // let playerCount = PlayerResource.GetPlayerCount();


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


        print(this.playerChooseHeroMap);
        GameRules.XNetTable.SetTableValue('heroTable', 'choiceHero', {
            choiceHeroList: [
                [list[0], list[1], list[2]],
                [list[3], list[4], list[5]],
                [list[6], list[7], list[8]],
                [list[9], list[10], list[11]],
                [list[12], list[13], list[14]],
            ],
        });
    }
}