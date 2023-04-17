import 'panorama-polyfill-x/lib/console';
import 'panorama-polyfill-x/lib/timers';

import React, {Fragment, useState} from 'react';
import {DOTAAbilityImageAttributes, DOTAHeroImageAttributes, render} from 'react-panorama-x';
import {useXNetTableKey} from '../hooks/useXNetTable';
import {HeroInfoDO} from '../../../../game/scripts/src/modules/do/HeroInfoDO';


// let chooseHero: string | undefined;
// let chooseAbility = new Set<string>();
// let chooseAbilityBig: string | undefined;

let chooseHeroName: string | undefined;
let chooseHeroDeleteAbilityName: string| undefined;
type ChooseHeroRowProps = {
    choiceHeroList: HeroInfoDO[];
};
const Test: React.FC = () => {
    const [result] = useXNetTableKey(`commonPool`, `heroPool`, {
        choiceHeroList: [],
    });

    //当前玩家列表交换到中间
    let playerNum: number = Players.GetLocalPlayer();
    let swap = result.choiceHeroList[2];
    result.choiceHeroList[2] = result.choiceHeroList[playerNum % 5];
    result.choiceHeroList[playerNum % 5] = swap;

    //倒计时英雄选择
    function timeCountDown() {
        $.Schedule(6000, () => {
            // const arr = [...chooseAbility];
            // let i = 0;
            // for (const str of chooseAbility) {
            //     arr[i++] = str;
            // }
            //
            $.Msg('初始选择');
            $.Msg(chooseHeroName);
            $.Msg(chooseHeroDeleteAbilityName);
            GameEvents.SendCustomGameEventToServer('choose_hero', { name: chooseHeroName, chooseHeroDeleteAbilityName: chooseHeroDeleteAbilityName });
        });
    }

    timeCountDown();
    $.Msg('初始选择');
    // $.Msg(result);
    // @ts-ignore
    return <ChooseHero choiceHeroList={result.choiceHeroList} />;
    // return (<Panel className={'root'}>
    //
    //     {/*<DOTAParticleScenePanel id="DeviceModel" renderdeferred={true} style={{width:'400px',height:'400px'}} deferredalpha={true} antialias={true} hittest={false} map="scenes/battlepass_fall2021/bp_2021_dashboard_device" useMapCamera={true} particleonly={false} startActive={true} fov={60} squarePixels={true} rotateonmousemove={true} yawmin={3} yawmax={-3} pitchmin={0} pitchmax={0} />*/}
    //     {/*<DOTAParticleScenePanel style={{width:'400px',height:'400px'}} className="QuestRewardParticleEffect" map="scenes/dota_ui_particle_scene_panel_empty" particleName="particles/econ/events/ti10/aghanim_aura_ti10/agh_aura_ti10.vpcf" renderdeferred={true}  particleonly={false} require-composition-layer={true} cameraOrigin="0 -250 100" lookAt="0 10 0" fov={40} />*/}
    //     <DOTAParticleScenePanel style={{width:'100%',height:'100%'}} className="BackgroundFX" hittest={false} particleName="particles/ui/battle_pass/ui_dashboard_aghanim.vpcf" particleonly={true} startActive={true} cameraOrigin="200 300 -300" lookAt="70 0 -30" fov={60} squarePixels={true} />
    //     {/*<DOTAParticleScenePanel style={{width:'100%',height:'100%'}} className="BackgroundFX" hittest={false} particleName="particles/ui/battle_pass/ui_dashboard_aghanim.vpcf" particleonly={true} startActive={true} cameraOrigin="200 300 -300" lookAt="70 0 -30" fov={60} squarePixels={true} />*/}
    //     {/*<DOTAScenePanel   style={{width:'200px',height:'200px',marginTop:'3px'}} environment={'full_body'} antialias={false} particleonly={false} unit={'npc_dota_hero_bounty_hunter'} yawmin={3} yawmax={-3} pitchmin={0} pitchmax={0}/>*/}
    //     {/*<DOTAScenePanel   style={{width:'200px',height:'200px',marginTop:'3px'}} environment={'full_body'} antialias={true} particleonly={false} unit={'npc_dota_hero_bounty_hunter'} light={'hero_light'} camera={'shot_camera'} renderdeferred={true} deferredalpha={true}  yawmin={3} yawmax={-3} pitchmin={0} pitchmax={0} rotateonmousemove={true}/>*/}
    //     {/*<DOTAScenePanel id={'ttest'}   style={{width:'200px',height:'200px',marginTop:'3px'}} map={'scenes/battle_pass/cavern_crawl_challenge_fx.map'} environment={'full_body'} antialias={true} particleonly={false}  light={'hero_light'} camera={'shot_camera'} renderdeferred={true} deferredalpha={true}  yawmin={3} yawmax={-3} pitchmin={0} pitchmax={0} rotateonmousemove={true}/>*/}
    //     {/*<Image  style={{width:'200px',height:'200px',marginTop:'3px'}} className="NodeIconImage" id="Icon" src={'file://{images}/compendium/international2017/prestigerewards/bottle_fx.png'} scaling="stretch-to-cover-preserve-aspect" />*/}
    //     {/*<GenericPanel type="DragZoom"  class="LabyrinthZoom" id="DragZoom" extrazoomout="1.0" invertminscalecalc="1" startzoomed="1" mousewheeltickcount="4" startingscale="0.4" minscale="0.2" maxscale="0.45" strictclamptranslation="1" zoomwithuiscale="1" disabledoubleclick="1" dragclickzone="30"></GenericPanel>*/}
    //     {/*<GenericPanel type={'DOTAScenePanel'} id="AghanimModel" style={{width:'800px',height:'800px'}} map="scenes/battlepass_fall2021/bp_2021_dashboard.vmap" hittest={false} camera="hero_camera" light="hero_light" renderdeferred={true} deferredalpha={true} antialias={true} particleonly={false} rotateonmousemove={true} yawmin={3} yawmax={-3} pitchmin={0} pitchmax={0} live-mode="high_end_only" />*/}
    //     <DOTAParticleScenePanel id="DeviceModel" renderdeferred={true} style={{width:'400px',height:'400px'}} deferredalpha={true} antialias={true} hittest={false} map="scenes/battlepass_fall2021/bp_2021_dashboard_device" useMapCamera={true} particleonly={false} startActive={true} fov={60} squarePixels={true} rotateonmousemove={true} yawmin={3} yawmax={-3} pitchmin={0} pitchmax={0} />
    //     {/*<GenericPanel type={'DOTAParticleScenePanel'} id="DeviceModel" renderdeferred={true} style={{width:'400px',height:'400px'}} deferredalpha={true} antialias={true} hittest={false} map="scenes/battlepass_fall2021/bp_2021_dashboard_device" useMapCamera={true} particleonly={false} startActive={true} fov={60} squarePixels={true} rotateonmousemove={true} yawmin={3} yawmax={-3} pitchmin={0} pitchmax={0} />*/}
    //
    // </Panel>);
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
    // const [chooseHeroList, setChooseHeroList] = useState<string[]>([]);
    // const chooseHero: string = '';
    let lastHeroPanel: Panel | undefined = undefined;
    let lastHeroAbilityPanel: Panel | undefined = undefined;

    // const ChooseHero = (e: Panel) => {
    //     // CustomUI.DynamicHud_SetVisible(-1,);
    //     // const PreGame = $.GetContextPanel()?.GetParent()?.GetParent()?.GetParent()?.FindChildTraverse('TopBar');
    //     // $.Msg(Game.GetState());
    //
    //     // @ts-ignore
    //     // PreGame.visible = true;
    //     // GameUI.SetDefaultUIEnabled(DotaDefaultUIElement_t.DOTA_DEFAULT_UI_TOP_BAR, true);
    //     // GameUI.SetDefaultUIEnabled(14, false);
    //     // GameUI.SetDefaultUIEnabled(15, false);
    //     // GameUI.SetDefaultUIEnabled(16, false);
    //     // Game.SetRemainingSetupTime(0);
    //     // Game.SetDotaRefractHeroes(false);
    //
    //     if(e.BHasClass('HeroIcon')){
    //         if(!e.BHasClass('IconSelected')){
    //             chooseAbilityBig = (e.GetParent()?.FindChildrenWithClassTraverse('HeroAbilityBig')[0] as DOTAAbilityImageAttributes)?.abilityname;
    //             chooseHero = (e as DOTAHeroImageAttributes).heroname;
    //         }
    //     }
    //
    //     //选中
    //     e.ToggleClass('IconSelected');
    //     //大招选中
    //     // $.Msg(e.GetParent()?.FindChildrenWithClassTraverse('HeroAbilityBig'));
    //     let panel: Panel = e.GetParent()?.FindChildrenWithClassTraverse('HeroAbilityBig')[0] as Panel;
    //     panel?.ToggleClass('IconSelected')
    //     // panel?.ToggleClass('IconSelected');
    //     // $.Msg();
    //     // $.Msg($('#ff').ToggleClass('IconSelected'));
    //     //取消上一个
    //     if (e != lastHeroPanel) {
    //         lastHeroPanel?.RemoveClass('IconSelected');
    //         //取消上个大招选中
    //         lastHeroPanel?.GetParent()?.FindChildrenWithClassTraverse('HeroAbilityBig')[0]?.RemoveClass('IconSelected');
    //         lastHeroPanel = e;
    //     }
    //
    //     // GameEvents.SendCustomGameEventToServer('choose_hero', { name: e['heroname'] as string });
    //     // Game.CreateCustomKeyBind('N', 'Cast1');
    //
    //     // GameEvents.SendCustomGameEventToServer('hero_selected', {  });
    //     // $('#ChooseHeroContainer').visible = false;
    //     // // $.Msg(props.name);
    //     // const ff: string[] = ['npc_dota_hero_zuus', 'npc_dota_hero_warlock'];
    //     // // return ff.map(item => {
    //     // //     <Panel className="HeroContainer">
    //     // //         <DOTAHeroImage className="HeroIcon" heroname={'npc_dota_hero_zuus'} heroimagestyle={'landscape'} />
    //     // //         <DOTAAbilityImage className="HeroAbility" abilityname={'lone_druid_spirit_bear'} showtooltip={true} />
    //     // //         <DOTAAbilityImage className="HeroAbility" abilityname={'lone_druid_spirit_bear'} showtooltip={true} />
    //     // //         <DOTAAbilityImage className="HeroAbility" abilityname={'lone_druid_spirit_bear'} showtooltip={true} />
    //     // //         <DOTAAbilityImage className="HeroAbility" abilityname={'lone_druid_spirit_bear'} showtooltip={true} />
    //     // //     </Panel>
    //     // // });
    //     // ff.map(item => {
    //     //     <DOTAAbilityImage key={item} className="HeroAbility" abilityname={'lone_druid_spirit_bear'} showtooltip={true} />;
    //     // });
    //     // return (
    //     //     <Panel className="HeroContainer">
    //     //         <DOTAHeroImage className="HeroIcon" heroname={props.name[0]} heroimagestyle={'landscape'} />
    //     //         <DOTAAbilityImage className="HeroAbility" abilityname={'lone_druid_spirit_bear'} showtooltip={true} />
    //     //         {ff.map(item => {
    //     //             <DOTAAbilityImage key={item} className="HeroAbility" abilityname={'lone_druid_spirit_bear'} showtooltip={true} />;
    //     //         })}
    //     //     </Panel>
    //     // );
    // };

    const ChooseHeroAbility = (e: Panel) => {

        // e.ToggleClass('abortAbility');
        // if(!e.GetParent()?.BHasClass('HeroContainerChoose')){
        //     ChooseOneHero(e.GetParent());
        // }
        // if(!e.BHasClass('abortAbility')){
        //     e.ToggleClass('abortAbility');
        //     //取消上一个
        //     $.Msg('111');
        //     lastHeroAbilityPanel?.RemoveClass('abortAbility');
        //     lastHeroAbilityPanel = e;
        //     chooseHeroDeleteAbilityName = (e as DOTAAbilityImageAttributes).abilityname;
        //
        // }


        //判断是否超出2，超出则判断
        // if (chooseAbility.size >= 2) {
        //     //如果是取消选择，则继续，否则结束
        //     if (e.BHasClass('IconSelected')) {
        //         e.ToggleClass('IconSelected');
        //         let attr = e as DOTAAbilityImageAttributes;
        //         if (attr && attr.abilityname) {
        //             chooseAbility.delete(attr.abilityname);
        //         }
        //     } else {
        //
        //         // GameEvents.SendEventClientSide('dota_hud_error_message', { reason: 2, message: '只能选择两个' });
        //         // ShowErrorMsg
        //         let table = $('#ErrorTable');
        //         table.AddClass('ShowErrorMsg');
        //         let tableLabel = $('#ErrorMsg') as LabelPanel;
        //         tableLabel.text = '只能选择两个技能，请先取消一个技能';
        //         // setInterval();
        //         // Timers.CreateTimer(3, () => {
        //         //     $.Msg('111');
        //         //     table.RemoveClass('ShowErrorMsg');
        //         // });
        //         $.Schedule(2, () => {
        //             table.RemoveClass('ShowErrorMsg');
        //         });
        //         return;
        //     }
        // } else {
        //     if (e.BHasClass('IconSelected')) {
        //         let attr = e as DOTAAbilityImageAttributes;
        //         if (attr && attr.abilityname) {
        //             chooseAbility.delete(attr.abilityname);
        //         }
        //         e.ToggleClass('IconSelected');
        //     } else {
        //         e.ToggleClass('IconSelected');
        //         let attr = e as DOTAAbilityImageAttributes;
        //         if (attr && attr.abilityname) {
        //             chooseAbility.add(attr.abilityname);
        //         }
        //     }
        // }
        //选中

        // lastHeroAbilityPanel?.RemoveClass('IconSelected');
        // lastHeroAbilityPanel = e;
    };

    const ChooseClass = (e: Panel | null) => {
        //shanchu
        let className = 'IconSelected';
        e?.GetParent()?.GetParent()?.FindChildrenWithClassTraverse(className)[0]?.RemoveClass(className);
        //tianjia
        //banedIcon IconSelected
        if(!e?.BHasClass(className)){
            e?.AddClass(className);
        }
    }
    const BandClass = (e: Panel | null) => {
        //shanchu
        let classNameFg = 'BandedFg';
        e?.GetParent()?.GetParent()?.FindChildrenWithClassTraverse(classNameFg)[0]?.RemoveClass(classNameFg);
        //tianjia
        //banedIcon IconSelected
        e?.GetParent()?.FindChild('AfterAbility')?.AddClass(classNameFg);

        //banedIcon
        let classNameIcon = 'BanedIcon';
        e?.GetParent()?.GetParent()?.FindChildrenWithClassTraverse(classNameIcon)[0]?.RemoveClass(classNameIcon);
        e?.AddClass(classNameIcon);
    }
    const ClickIcon = (e: Panel | null) => {
        //shanchu
        BandClass(e);
    }

    let lastClickHero: Panel | null;

    // const ChooseOneHero = (e: Panel | null) => {
    //     // $.Msg(e?.SetAttributeString('index', 'aa'));
    //     $.Msg(e?.GetAttributeString('index', '-1'));
    //     $.Msg(e);
    //     // $("#QuestLifeText").GetParent()
    //     // if(!e?.BHasClass('HeroContainerChoose')){
    //     //     e?.AddClass('HeroContainerChoose');
    //     //     let heroPanels = e?.FindChildrenWithClassTraverse('HeroIcon')[0] as DOTAHeroImageAttributes;
    //     //     chooseHeroName = heroPanels?.heroname;
    //     //
    //     //     //取消上个选中
    //     //     lastClickHero?.RemoveClass('HeroContainerChoose');
    //     //     lastClickHero = e;
    //     //     lastHeroAbilityPanel?.RemoveClass('abortAbility');
    //     // }
    //
    // }
    const ChooseHeroRowComponent: React.FC<ChooseHeroRowProps> = props => {
        const [chooseHero, setChooseHero] = useState<string>('');
        const ChooseOneHero = (e: Panel | null) => {
            $.Msg((e as DOTAHeroImageAttributes).heroname);
            ChooseClass(e);
            // @ts-ignore
            let heroName: string = (e as DOTAHeroImageAttributes).heroname;
            setChooseHero(heroName);
        };
        const onMouseOver = () => {
            $.Msg('over');
        };
        return (
            <Panel className={'ChooseHeroRow DefaultBackground'} hittest={true}>
                <Panel className={'ChooseHeroPlayerInfoGoodContainer'} hittest={true}>


                    <Panel className={'ChooseHeroPlayerGoodImg DefaultBorder'} hittest={true} >
                        <DOTAHeroMovie heroname={chooseHero} />
                        {/*<DOTAScenePanel  style={{width:'500px',height:'500px'}}  className="LabyrinthEffects" id="Effects"  camera="shot_camera" map="scenes/battle_pass/jungle_campfire" hittest={false} particleonly={true} require-composition-layer="true" />*/}
                        {/*'npc_dota_hero_bounty_hunter'*/}
                        {/*<DOTAScenePanel key={'a'}  style={{width:'200px',height:'200px',marginTop:'3px'}} environment={'full_body'} antialias={false} particleonly={false} unit={chooseHero} />*/}
                        {/*头像-请求交换*/}
                        <Panel className="HeroSkillSwapContainer">
                            <Button className="HeroSkillSwap">
                                <Label className={'HeroSkillSwapLabel'} text={'请求交换'}></Label>
                            </Button>
                        </Panel>
                    </Panel>

                    <Panel className={'ChooseHeroPlayerGoodTextInfo'} hittest={true}>
                        {/*文本-头像*/}
                        <Panel className="PlayerContainer">
                            <Panel className={'PlayerContainerMid'}>
                                <DOTAAvatarImage
                                    steamid={Game.GetLocalPlayerInfo().player_steamid}
                                    style={{ width: '50px', height: '50px', horizontalAlign: 'center', verticalAlign: 'center' }}
                                />
                                <DOTAUserName steamid={Game.GetLocalPlayerInfo().player_steamid} className="PlayerName"></DOTAUserName>
                            </Panel>
                        </Panel>

                        {/*文本-技能*/}
                        <Panel className="HeroSkillContainer">
                            <Panel className="HeroSkillMid">
                                <DOTAAbilityImage className="HeroSmallAbility" abilityname={'lone_druid_spirit_bear'} showtooltip={true} />
                                <DOTAAbilityImage className="HeroSmallAbility" abilityname={'lone_druid_spirit_bear'} showtooltip={true} />
                                <DOTAAbilityImage className="HeroSmallAbility" abilityname={'lone_druid_spirit_bear'} showtooltip={true} />
                                <DOTAAbilityImage className="HeroSmallAbility" abilityname={'lone_druid_spirit_bear'} showtooltip={true} />
                            </Panel>
                        </Panel>
                    </Panel>
                </Panel>
                <Panel className={'ChooseHeroPlayerHeroContainer'} hittest={true}>
                    <Panel className={'ChooseHeroPlayerHeroList'} hittest={true}>
                        {props.choiceHeroList.map((item, index) => (
                            <DOTAHeroImage className={'HeroIcon DefaultBorder HoverIcon'} heroname={item.name} heroimagestyle={'portrait'}
                                           focusonhover={true} onmouseactivate={ChooseOneHero}/>
                        ))}
                        {/*<DOTAHeroImage className="HeroIcon" heroname="npc_dota_hero_zuus" heroimagestyle={'portrait'} />*/}
                        {/*<DOTAHeroImage className="HeroIcon" heroname="npc_dota_hero_zuus" heroimagestyle={'portrait'} />*/}
                        {/*<DOTAHeroImage className="HeroIcon" heroname="npc_dota_hero_zuus" heroimagestyle={'portrait'} />*/}
                        {/*<DOTAHeroImage className="HeroIcon" heroname="npc_dota_hero_zuus" heroimagestyle={'portrait'} />*/}
                        {/*<DOTAHeroImage className="HeroIcon" heroname="npc_dota_hero_zuus" heroimagestyle={'portrait'} />*/}
                    </Panel>
                </Panel>
                <Panel className={'ChooseHeroPlayerInfoBedContainer'} hittest={true}>
                    {/*文本-头像*/}
                    <Panel className="PlayerContainer">
                        <Panel className={'PlayerContainerMid'}>
                            <DOTAAvatarImage
                                steamid={Game.GetLocalPlayerInfo().player_steamid}
                                style={{ width: '50px', height: '50px', horizontalAlign: 'center', verticalAlign: 'center' }}
                            />
                            <DOTAUserName steamid={Game.GetLocalPlayerInfo().player_steamid} className="PlayerName"></DOTAUserName>
                        </Panel>
                    </Panel>

                    {/*文本-技能*/}
                    <Panel className="HeroSkillContainer">
                        <Panel className="HeroSkillMid">
                            <DOTAAbilityImage className="HeroSmallAbility" abilityname={'lone_druid_spirit_bear'} showtooltip={true} />
                            <DOTAAbilityImage className="HeroSmallAbility" abilityname={'lone_druid_spirit_bear'} showtooltip={true} />
                            <DOTAAbilityImage className="HeroSmallAbility" abilityname={'lone_druid_spirit_bear'} showtooltip={true} />
                            <DOTAAbilityImage className="HeroSmallAbility" abilityname={'lone_druid_spirit_bear'} showtooltip={true} />
                        </Panel>
                    </Panel>
                </Panel>
            </Panel>
        );
    };
    return (
        <Panel className={'root'} hittest={false}
               // style={{ visibility: 'collapse' }}
        >
            <Panel id={'background'}>
                <Panel id={'bg1'}>
                </Panel>
                <Panel id={'bg2'}>
                </Panel>
                <DOTAParticleScenePanel style={{width:'100%',height:'100%'}} className="BackgroundFX" hittest={false} particleName="particles/ui/battle_pass/ui_dashboard_aghanim.vpcf" particleonly={true} startActive={true} cameraOrigin="200 300 -300" lookAt="70 0 -30" fov={60} squarePixels={true} />
            </Panel>

            <Panel id="ChooseHeroContainer" hittest={true}>
                {/*<DOTAParticleScenePanel*/}
                {/*    particleName={'particles/agh_ability_selection_ambient.vpcf'}*/}
                {/*    particleonly={true}*/}
                {/*    startActive={true}*/}
                {/*    cameraOrigin={[500, 0, 0]}*/}
                {/*    lookAt={[0, -255, 0]}*/}
                {/*    fov={60}*/}
                {/*    squarePixels={true}*/}
                {/*></DOTAParticleScenePanel>*/}
                {/*左*/}
                <Panel id={'ChooseHeroContainerLeft'} className={''} hittest={true}>
                    {/*技能池*/}
                    <Panel id={'ChooseHeroContainerCommonPool'} hittest={true}>
                        {/*小技能池*/}
                        <Panel id={'ChooseHeroContainerSmallSkillPool'} className={'DefaultBackground'} hittest={true}>
                            <Panel id={'ChooseHeroContainerLabelContainer'} hittest={true} >
                                <Label id={'ChooseHeroContainerLabel'} hittest={true} text={'小技能池'}>
                                </Label>
                            </Panel>
                            <Panel id={'ChooseHeroContainerSkillContentList'}  hittest={true} >
                                {[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1].map(n =>(
                                    <Panel className={'ChooseHeroContainerSkillContent'}>
                                        <DOTAAbilityImage className="ChooseHeroContainerSkill DefaultBorder HoverIcon" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ClickIcon}/>
                                        <Panel id={'AfterAbility'} hittest={false} />
                                    </Panel>
                                ))}
                                {/*<DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}
                                {/*<DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}
                                {/*<DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}
                                {/*<DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}
                                {/*<DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}
                                {/*<DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}

                            </Panel>
                        </Panel>
                        {/*大技能池*/}
                        <Panel id={'ChooseHeroContainerBigSkillPool'} className={'DefaultBackground'} hittest={true}>
                            <Panel id={'ChooseHeroContainerLabelContainer'} hittest={true} >
                                <Label id={'ChooseHeroContainerLabel'} hittest={true} text={'大招池'}>
                                </Label>
                            </Panel>
                            <Panel id={'ChooseHeroContainerSkillContent'}  className={'DefaultBorder'} hittest={true} >
                                {[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1].map(n =>(
                                    <DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>
                                ))}
                               {/*<DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}
                               {/* <DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}
                               {/* <DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}
                               {/* <DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}
                               {/* <DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}
                               {/* <DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}
                            </Panel>
                        </Panel>
                    </Panel>
                </Panel>
                {/*右*/}
                <Panel id={'ChooseHeroContainerRight'} hittest={true}>
                    {/*英雄选择行*/}
                    {props.choiceHeroList?.map((fighter, index) => (
                        <ChooseHeroRowComponent key={index + 'Row'} choiceHeroList={fighter} />
                        // <Panel className={'ChooseHeroRow'} hittest={true}>
                        //
                        // </Panel>
                    ))}
                </Panel>

                {/*<Panel id={'ChooseHeroContainerTop'} hittest={true}>*/}
                {/*    {props.choiceHeroList?.map((fighter, index) => (*/}
                {/*        <Panel className="ChooseHeroItem" >*/}
                {/*            <Panel className="PlayerContainer">*/}
                {/*                <Panel className={'PlayerContainerMid'}>*/}
                {/*                    <DOTAAvatarImage*/}
                {/*                        steamid={Game.GetLocalPlayerInfo().player_steamid}*/}
                {/*                        style={{ width: '50px', height: '50px', horizontalAlign: 'center', verticalAlign: 'center' }}*/}
                {/*                    />*/}
                {/*                    <DOTAUserName steamid={Game.GetLocalPlayerInfo().player_steamid}*/}
                {/*                                  className="PlayerName"></DOTAUserName>*/}
                {/*                </Panel>*/}
                {/*            </Panel>*/}
                {/*            <Panel className="HeroIconContainer" onmouseactivate={ChooseOneHero}>*/}
                {/*                /!*<DOTAHeroImage className={'HeroIconImg'} heroname={'npc_dota_hero_pugna'} heroimagestyle={'icon'} />*!/*/}
                {/*                /!*<DOTAHeroMovie heroname={'npc_dota_hero_pugna'} />*!/*/}
                {/*                <DOTAHeroMovie heroname={'npc_dota_hero_axe'} style={{ width: '97px', height: '130px' }}/>*/}

                {/*            </Panel>*/}
                {/*            <Panel className="HeroContainer" onmouseactivate={ChooseOneHero}>*/}
                {/*                <DOTAHeroImage className={'HeroIcon'} heroname={'npc_dota_hero_pugna'} heroimagestyle={'landscape'} />*/}
                {/*                <DOTAHeroImage className={'HeroIcon'} heroname={'npc_dota_hero_pugna'} heroimagestyle={'landscape'} />*/}
                {/*                <DOTAHeroImage className={'HeroIcon'} heroname={'npc_dota_hero_pugna'} heroimagestyle={'landscape'} />*/}
                {/*                <DOTAHeroImage className={'HeroIcon'} heroname={'npc_dota_hero_pugna'} heroimagestyle={'landscape'} />*/}
                {/*                <DOTAHeroImage className={'HeroIcon'} heroname={'npc_dota_hero_pugna'} heroimagestyle={'landscape'} />*/}
                {/*                <DOTAHeroImage className={'HeroIcon'} heroname={'npc_dota_hero_pugna'} heroimagestyle={'landscape'} />*/}
                {/*            </Panel>*/}

                {/*            /!*{fighter.map((item, index) => (*!/*/}
                {/*            /!*    <Panel className="HeroContainer" onmouseactivate={ChooseOneHero}>*!/*/}
                {/*            /!*        <DOTAHeroImage className={'HeroIcon'} heroname={item.name} heroimagestyle={'landscape'} />*!/*/}
                {/*            /!*        <DOTAAbilityImage className="HeroAbility" abilityname={item.ab1} showtooltip={true}*!/*/}
                {/*            /!*                          onmouseactivate={ChooseHeroAbility}/>*!/*/}
                {/*            /!*        <DOTAAbilityImage className="HeroAbility" abilityname={item.ab2} showtooltip={true}*!/*/}
                {/*            /!*                          onmouseactivate={ChooseHeroAbility}/>*!/*/}
                {/*            /!*        <DOTAAbilityImage className="HeroAbility" abilityname={item.ab3} showtooltip={true}*!/*/}
                {/*            /!*                          onmouseactivate={ChooseHeroAbility}/>*!/*/}
                {/*            /!*        <DOTAAbilityImage*!/*/}
                {/*            /!*            className="HeroAbility HeroAbilityBig"*!/*/}
                {/*            /!*            abilityname={item.ab4}*!/*/}
                {/*            /!*            showtooltip={true}*!/*/}
                {/*            /!*            // onmouseactivate={ChooseHeroAbility}*!/*/}
                {/*            /!*        />*!/*/}
                {/*            /!*    </Panel>*!/*/}
                {/*            /!*))}*!/*/}
                {/*            /!*<Panel className="HeroContainer">*!/*/}
                {/*            /!*    <DOTAHeroImage className="HeroIcon" heroname="npc_dota_hero_zuus" heroimagestyle={'landscape'} />*!/*/}
                {/*            /!*    <DOTAAbilityImage className="HeroAbility" abilityname={'lone_druid_spirit_bear'} showtooltip={true} />*!/*/}
                {/*            /!*    <DOTAAbilityImage className="HeroAbility" abilityname={'lone_druid_spirit_bear'} showtooltip={true} />*!/*/}
                {/*            /!*    <DOTAAbilityImage className="HeroAbility" abilityname={'lone_druid_spirit_bear'} showtooltip={true} />*!/*/}
                {/*            /!*    <DOTAAbilityImage className="HeroAbility" abilityname={'lone_druid_spirit_bear'} showtooltip={true} />*!/*/}
                {/*            /!*</Panel>*!/*/}
                {/*            <Panel className="PlayerContainer"></Panel>*/}
                {/*        </Panel>*/}
                {/*    ))}*/}
                {/*</Panel>*/}
                {/*<Panel id={'ChooseHeroContainerCommonPool'} hittest={true}>*/}
                {/*    <Panel id={'ChooseHeroContainerSmallSkillPool'} hittest={true}>*/}
                {/*        <Panel id={'ChooseHeroContainerLabelContainer'} hittest={true} >*/}
                {/*            <Label id={'ChooseHeroContainerLabel'} hittest={true} text={'小技能池'}>*/}

                {/*            </Label>*/}
                {/*        </Panel>*/}
                {/*        <Panel id={'ChooseHeroContainerSkillContainer'} hittest={true} >*/}
                {/*            <DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}
                {/*            <DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}
                {/*            <DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}
                {/*            <DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}
                {/*            <DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}
                {/*            <DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}
                {/*            <DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}
                {/*            <DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}
                {/*            <DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}
                {/*            <DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}
                {/*            <DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}
                {/*            <DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}
                {/*            <DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}
                {/*            <DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}
                {/*            <DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}
                {/*            <DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}
                {/*            <DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}
                {/*            <DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}
                {/*            <DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}
                {/*            <DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}
                {/*            <DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}
                {/*            <DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}
                {/*            <DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}
                {/*        </Panel>*/}
                {/*    </Panel>*/}
                {/*    <Panel id={'ChooseHeroContainerBigSkillPool'} hittest={true}>*/}
                {/*        <Panel id={'ChooseHeroContainerLabelContainer'} hittest={true} >*/}
                {/*            <Label id={'ChooseHeroContainerLabel'} hittest={true} text={'小技能池'}>*/}

                {/*            </Label>*/}
                {/*        </Panel>*/}
                {/*        <Panel id={'ChooseHeroContainerSkillContainer'} hittest={true} >*/}
                {/*            <DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}
                {/*            <DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}
                {/*            <DOTAAbilityImage className="ChooseHeroContainerSkill" abilityname={'wisp_tether'} showtooltip={true} onmouseactivate={ChooseHeroAbility}/>*/}

                {/*        </Panel>*/}
                {/*    </Panel>*/}
                {/*</Panel>*/}


                {/*<Panel id={'ErrorTable'} className={'VisGroup_top  PopOutEffect'}>*/}
                {/*    <Label id={'ErrorMsg'} text={''}></Label>*/}
                {/*</Panel>*/}
            </Panel>
        </Panel>
    );
}

