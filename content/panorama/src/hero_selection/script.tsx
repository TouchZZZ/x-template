import 'panorama-polyfill-x/lib/console';
import 'panorama-polyfill-x/lib/timers';

import React, {Fragment, useState} from 'react';
import {DOTAAbilityImageAttributes, DOTAHeroImageAttributes, render} from 'react-panorama-x';
import {useXNetTableKey} from '../hooks/useXNetTable';
import {HeroInfoDO} from '../../../../game/scripts/src/modules/do/HeroInfoDO';


let chooseHero: string | undefined;
let chooseAbility = new Set<string>();
let chooseAbilityBig: string | undefined;

const Test: React.FC = () => {
    const [result] = useXNetTableKey(`heroTable`, `choiceHero`, {
        choiceHeroList: undefined,
    });

    //倒计时英雄选择
    function timeCountDown() {
        $.Schedule(10, () => {
            $.Msg('aaaaa');

            const arr = [...chooseAbility];
            // let i = 0;
            // for (const str of chooseAbility) {
            //     arr[i++] = str;
            // }
            // $.Msg(arr);
            // timeCountDown();
            GameEvents.SendCustomGameEventToServer('choose_hero', { name: chooseHero, ab1: arr[0], ab2: arr[1], abilityBig: chooseAbilityBig });
        });
    }

    // timeCountDown();

    $.Msg('AAA');
    $.Msg(result);
    // @ts-ignore
    return <ChooseHero choiceHeroList={result.choiceHeroList} />;
    // return (<Label text={`${string_data}`} style={{ width:'100px',height:'200px',border: '8px solid yellow;' }}/>);
    // return React.useMemo(() => <Label text={`${string_data}`} style={{ width:'100px',height:'200px',border: '8px solid yellow;' }}/>, [string_data]);
};
// GameUI.SetMouseCallback((event, arg) => {
//     $.Msg(event);
//     $.Msg(arg);
//     return true;
// });
GameEvents.SendCustomGameEventToServer('hero_init_ready', {});
// GameEvents.SendCustomGameEventToServer('hero_init_ready', { name: 'a' });
// GameEvents.Subscribe(`hero_init`, data => {
//     // $('#ChooseHeroContainer').BLoadLayout()
//     // $('#ChooseHeroContainer').create
//     // let aa: string[] = data.name;
//     // $.Msg(result);
//     // render(<ChooseHero name={parseServerArray(data.name)} />, $.GetContextPanel());
render(<Test/>, $.GetContextPanel());
// });
// GameEvents.Subscribe(`x_net_table`, data => {
//     $.Msg('hello!!');
//     $.Msg(data);
// });

// function parseServerArray<T>(array: { [key: string]: T }): T[] {
//     const result: T[] = [];
//
//     for (const index in array) {
//         result[parseInt(index) - 1] = array[index];
//     }
//
//     return result;
// }

type Props = {
    choiceHeroList: HeroInfoDO[][];
};

// $.Msg('!!!!!');
// $.Msg(Game.GetState());
function ChooseHero(props: Props) {
    const [list, setList] = useState<string[]>([]);
    // const chooseHero: string = '';
    let lastHeroPanel: Panel | undefined = undefined;
    const ChooseHero = (e: Panel) => {
        // CustomUI.DynamicHud_SetVisible(-1,);
        // const PreGame = $.GetContextPanel()?.GetParent()?.GetParent()?.GetParent()?.FindChildTraverse('TopBar');
        // $.Msg(Game.GetState());

        // @ts-ignore
        // PreGame.visible = true;
        // GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR, true);
        // GameUI.SetDefaultUIEnabled(14, false);
        // GameUI.SetDefaultUIEnabled(15, false);
        // GameUI.SetDefaultUIEnabled(16, false);
        // Game.SetRemainingSetupTime(0);
        // Game.SetDotaRefractHeroes(false);
        
        if(e.BHasClass('HeroIcon')){
            if(!e.BHasClass('IconSelected')){
                chooseAbilityBig = (e.GetParent()?.FindChildrenWithClassTraverse('HeroAbilityBig')[0] as DOTAAbilityImageAttributes)?.abilityname;
                chooseHero = (e as DOTAHeroImageAttributes).heroname;
            }
        }

        //选中
        e.ToggleClass('IconSelected');
        //大招选中
        // $.Msg(e.GetParent()?.FindChildrenWithClassTraverse('HeroAbilityBig'));
        let panel: Panel = e.GetParent()?.FindChildrenWithClassTraverse('HeroAbilityBig')[0] as Panel;
        panel?.ToggleClass('IconSelected')
        // panel?.ToggleClass('IconSelected');
        // $.Msg();
        // $.Msg($('#ff').ToggleClass('IconSelected'));
        //取消上一个
        if (e != lastHeroPanel) {
            lastHeroPanel?.RemoveClass('IconSelected');
            //取消上个大招选中
            lastHeroPanel?.GetParent()?.FindChildrenWithClassTraverse('HeroAbilityBig')[0]?.RemoveClass('IconSelected');
            lastHeroPanel = e;
        }

        // GameEvents.SendCustomGameEventToServer('choose_hero', { name: e['heroname'] as string });
        // Game.CreateCustomKeyBind('N', 'Cast1');

        // GameEvents.SendCustomGameEventToServer('hero_selected', {  });
        // $('#ChooseHeroContainer').visible = false;
        // // $.Msg(props.name);
        // const ff: string[] = ['npc_dota_hero_zuus', 'npc_dota_hero_warlock'];
        // // return ff.map(item => {
        // //     <Panel className="HeroContainer">
        // //         <DOTAHeroImage className="HeroIcon" heroname={'npc_dota_hero_zuus'} heroimagestyle={'landscape'} />
        // //         <DOTAAbilityImage className="HeroAbility" abilityname={'lone_druid_spirit_bear'} showtooltip={true} />
        // //         <DOTAAbilityImage className="HeroAbility" abilityname={'lone_druid_spirit_bear'} showtooltip={true} />
        // //         <DOTAAbilityImage className="HeroAbility" abilityname={'lone_druid_spirit_bear'} showtooltip={true} />
        // //         <DOTAAbilityImage className="HeroAbility" abilityname={'lone_druid_spirit_bear'} showtooltip={true} />
        // //     </Panel>
        // // });
        // ff.map(item => {
        //     <DOTAAbilityImage key={item} className="HeroAbility" abilityname={'lone_druid_spirit_bear'} showtooltip={true} />;
        // });
        // return (
        //     <Panel className="HeroContainer">
        //         <DOTAHeroImage className="HeroIcon" heroname={props.name[0]} heroimagestyle={'landscape'} />
        //         <DOTAAbilityImage className="HeroAbility" abilityname={'lone_druid_spirit_bear'} showtooltip={true} />
        //         {ff.map(item => {
        //             <DOTAAbilityImage key={item} className="HeroAbility" abilityname={'lone_druid_spirit_bear'} showtooltip={true} />;
        //         })}
        //     </Panel>
        // );
    };
    let lastHeroAbilityPanel: Panel | undefined = undefined;

    const ChooseHeroAbility = (e: Panel) => {
        // $.Msg(chooseAbility.size);
        // chooseAbility.add('a');
        // chooseAbility.add('b');
        // chooseAbility.add('c');
        // $.Msg(chooseAbility.size);
        // chooseAbility.delete('a');
        // chooseAbility.delete('b');
        // chooseAbility.delete('c');
        // $.Msg(chooseAbility.size);
        // e.ToggleClass('IconSelected');
        //判断是否超出2，超出则判断
        if (chooseAbility.size >= 2) {
            //如果是取消选择，则继续，否则结束
            if (e.BHasClass('IconSelected')) {
                e.ToggleClass('IconSelected');
                let attr = e as DOTAAbilityImageAttributes;
                if (attr && attr.abilityname) {
                    chooseAbility.delete(attr.abilityname);
                }
            } else {

                // GameEvents.SendEventClientSide('dota_hud_error_message', { reason: 2, message: '只能选择两个' });
                // ShowErrorMsg
                let table = $('#ErrorTable');
                table.AddClass('ShowErrorMsg');
                let tableLabel = $('#ErrorMsg') as LabelPanel;
                tableLabel.text = '只能选择两个技能，请先取消一个技能';
                // setInterval();
                // Timers.CreateTimer(3, () => {
                //     $.Msg('111');
                //     table.RemoveClass('ShowErrorMsg');
                // });
                $.Schedule(2, () => {
                    table.RemoveClass('ShowErrorMsg');
                });
                return;
            }
        } else {
            if (e.BHasClass('IconSelected')) {
                let attr = e as DOTAAbilityImageAttributes;
                if (attr && attr.abilityname) {
                    chooseAbility.delete(attr.abilityname);
                }
                e.ToggleClass('IconSelected');
            } else {
                e.ToggleClass('IconSelected');
                let attr = e as DOTAAbilityImageAttributes;
                if (attr && attr.abilityname) {
                    chooseAbility.add(attr.abilityname);
                }
            }
        }
        //选中

        // lastHeroAbilityPanel?.RemoveClass('IconSelected');
        // lastHeroAbilityPanel = e;
    };
    return (
        <Panel className={'root'}>

            <Panel id="ChooseHeroContainer" hittest={true}>
                <DOTAParticleScenePanel
                    particleName={'particles/agh_ability_selection_ambient.vpcf'}
                    particleonly={true}
                    startActive={true}
                    cameraOrigin={[500, 0, 0]}
                    lookAt={[0, -255, 0]}
                    fov={60}
                    squarePixels={true}
                ></DOTAParticleScenePanel>
                {props.choiceHeroList?.map((fighter, index) => (
                    <Panel className="ChooseHeroItem">
                        <Panel className="PlayerContainer">
                            <DOTAAvatarImage
                                steamid={Game.GetLocalPlayerInfo().player_steamid}
                                style={{width: '50px', height: '50px', horizontalAlign: 'center'}}
                            />
                            <DOTAUserName steamid={Game.GetLocalPlayerInfo().player_steamid}
                                          className="PlayerName"></DOTAUserName>
                        </Panel>
                        {fighter.map((item, index) => (
                            <Panel className="HeroContainer">
                                <DOTAHeroImage className={'HeroIcon'} heroname={item.name} heroimagestyle={'landscape'}
                                               onmouseactivate={ChooseHero}/>
                                <DOTAAbilityImage className="HeroAbility" abilityname={item.ab1} showtooltip={true}
                                                  onmouseactivate={ChooseHeroAbility}/>
                                <DOTAAbilityImage className="HeroAbility" abilityname={item.ab2} showtooltip={true}
                                                  onmouseactivate={ChooseHeroAbility}/>
                                <DOTAAbilityImage className="HeroAbility" abilityname={item.ab3} showtooltip={true}
                                                  onmouseactivate={ChooseHeroAbility}/>
                                <DOTAAbilityImage
                                    className="HeroAbility HeroAbilityBig"
                                    abilityname={item.ab4}
                                    showtooltip={true}
                                    // onmouseactivate={ChooseHeroAbility}
                                />
                            </Panel>
                        ))}
                        {/*<Panel className="HeroContainer">*/}
                        {/*    <DOTAHeroImage className="HeroIcon" heroname="npc_dota_hero_zuus" heroimagestyle={'landscape'} />*/}
                        {/*    <DOTAAbilityImage className="HeroAbility" abilityname={'lone_druid_spirit_bear'} showtooltip={true} />*/}
                        {/*    <DOTAAbilityImage className="HeroAbility" abilityname={'lone_druid_spirit_bear'} showtooltip={true} />*/}
                        {/*    <DOTAAbilityImage className="HeroAbility" abilityname={'lone_druid_spirit_bear'} showtooltip={true} />*/}
                        {/*    <DOTAAbilityImage className="HeroAbility" abilityname={'lone_druid_spirit_bear'} showtooltip={true} />*/}
                        {/*</Panel>*/}
                        <Panel className="PlayerContainer"></Panel>
                    </Panel>
                ))}
            </Panel>
            <Panel id={'ErrorTable'} className={'VisGroup_top  PopOutEffect'}>
                <Label id={'ErrorMsg'} text={''}></Label>
            </Panel>
        </Panel>
    );
}
