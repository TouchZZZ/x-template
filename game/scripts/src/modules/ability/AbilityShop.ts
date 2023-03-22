
import * as baseJson from "../../json/hero_base.json";

export class AbilityShop {
    constructor() {
        //初始化数据
        // Timers.CreateTimer(3, () => {
        //
        //     return 3;
        // });
        this.initAbilityPublicPool();
    }
    private initAbilityPublicPool() {
        //读取全部技能

        let allab = [];
        let size = 119;
        print('result');
        for (let i = 1; i < size + 1; i++) {
            allab[i * 4 + 1] = baseJson[i + '']['ab1'];
            allab[i * 4 + 2] = baseJson[i + '']['ab2'];
            allab[i * 4 + 3] = baseJson[i + '']['ab3'];
            allab[i * 4 + 4] = baseJson[i + '']['ab4'];
        }
        //随机30个技能
        let abilityList = [];
        for (let i = 0; i < 30; i++) {
            abilityList.push(allab[RandomInt(0, size * 4 - 1)]);
        }
        //发送公共技能池
        GameRules.XNetTable.SetTableValue('commonPool', 'abilityPool', {
            abilityList: abilityList,
        });
    }
}