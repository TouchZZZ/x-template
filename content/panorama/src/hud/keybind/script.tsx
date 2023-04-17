import 'panorama-polyfill-x/lib/console';
import 'panorama-polyfill-x/lib/timers';

import React, { useState } from 'react';
import { render } from 'react-panorama-x';
import { useXNetTableKey } from '../../hooks/useXNetTable';

type AbilityBindInfoDO = {
    // name: (name: string) => void;
    name: string;
    hotkey: string;
    idx: number;
    quickCast: boolean;
};
const keyList = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'b',
    'c',
    'n',
    'v',
    'x',
    'z',
    '0',
    'a',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'w',
    'pgup',
    'pgdn',
    'end',
    'home',
    'ins',
    'del',
    'leftarrow',
    'uparrow',
    'rightarrow',
    'downarrow',
    'kp_0',
    'kp_1',
    'kp_2',
    'kp_3',
    'kp_4',
    'kp_5',
    'kp_6',
    'kp_7',
    'kp_8',
    'kp_9',
    'kp_divide',
    'kp_plus',
    'kp_minus',
    'kp_del',
    'f1',
    'f2',
    'f3',
    'f4',
    'f5',
    'f6',
    'f7',
    'f9',
    'f10',
    'f11',
    'f12',
    'mouse1',
    'mouse2',
    'mouse4',
    'mouse6',
    'mouse7',
    'mouse8',
    'mouse9',
    'mouse10',
    'mouse11',
];

const KeyBindRoot: React.FC = () => {

    initKeyBind();
    function initKeyBind() {
        // GameUI.CustomUIConfig().EventBus?.Add(Ability1, () => $.Msg("Ability 1 Has Been Cast"))
        for (const ele in DOTAKeybindCommand_t) {
            // @ts-ignore
            let key = Game.GetKeybindForCommand(DOTAKeybindCommand_t[ele]);
            let indexOf = keyList.indexOf(key.toLowerCase());

            if (indexOf >= 0) {
                delete keyList[indexOf];
            }
        }
        // $.Msg(Game.GetKeybindForCommand(DOTAKeybindCommand_t.DOTA_KEYBIND_ABILITY_PRIMARY1));
        // $.Msg(Game.GetKeybindForCommand(DOTAKeybindCommand_t.DOTA_KEYBIND_ABILITY_PRIMARY1_QUICKCAST));
        $.Msg(keyList);
        for (const key of keyList) {
            if (null != key) {
                AddKeyBind(
                    key,
                    () => {
                        //按钮被按
                        // $.Msg(choicePanel.FindChildTraverse('value'));
                        if (choicePanel) {
                            choicePanel.RemoveClass('active');
                            let panel: LabelPanel = choicePanel.FindChildTraverse('value') as LabelPanel;
                            if (panel) {
                                panel.text = key;
                            }
                            let mod = choicePanel.FindChildTraverse('mod') as LabelPanel;
                            let idx = choicePanel.GetAttributeInt('idx', 0);
                            let name = choicePanel.GetAttributeString('name', '');
                            //当前hotkey
                            let oldHotKey = $.GetContextPanel()
                                .GetParent()
                                ?.GetParent()
                                ?.GetParent()
                                ?.FindChildTraverse('HUDElements')
                                ?.FindChildTraverse('abilities')
                                ?.FindChildTraverse('Ability' + idx)
                                ?.FindChildTraverse('Hotkey');
                            let oldKey: LabelPanel = oldHotKey?.FindChildTraverse('HotkeyText') as LabelPanel;
                            //原来的失效
                            keyMap.set(oldKey.text?.toLowerCase(), undefined);
                            if (mod) {
                                let playerHeroIndex: EntityIndex = Players.GetLocalPlayerPortraitUnit();
                                let getAbility = Entities.GetAbilityByName(playerHeroIndex, name);
                                keyMap.set(key.toLowerCase(), getAbility);
                            }
                            if (oldHotKey) {
                                oldHotKey.style.visibility = 'visible';
                            }

                            //图标
                            oldKey.text = key.toUpperCase();
                            choicePanel = null;
                        } else {
                            //使用
                            let getAbility: AbilityEntityIndex | undefined = keyMap.get(key.toLowerCase());
                            let abName = '';
                            if (getAbility) {
                                abName = Abilities.GetAbilityName(getAbility);
                            }
                            if (getAbility) {
                                // $.Msg(getAbility);
                                let playerHeroIndex: EntityIndex = Players.GetLocalPlayerPortraitUnit();
                                $.Msg(abilityQuickCastSet.has(abName));
                                Abilities.ExecuteAbility(getAbility, playerHeroIndex, true);
                            }
                        }
                    },
                    () => {}
                );
            }
        }
    }

    // return React.useMemo(
    //     () => <Label text={`${string_data}`} style={{ width: '100px', height: '200px', border: '8px solid yellow;' }} />,
    //     [string_data]
    function OnSettingsClose() {
        let playerHeroIndex: EntityIndex = Players.GetLocalPlayerPortraitUnit();
        let getAbility = Entities.GetAbility(playerHeroIndex, 4);
        for (let j = 0; j < 10; j++) {
            let ability = Entities.GetAbility(playerHeroIndex, j);
            $.Msg(Abilities.GetAbilityName(ability));
        }
        //面板找技能
        let i = 0;
        let numList: AbilityBindInfoDO[] = [];
        while (true) {
            let abMain = $.GetContextPanel()
                .GetParent()
                ?.GetParent()
                ?.GetParent()
                ?.FindChildTraverse('HUDElements')
                ?.FindChildTraverse('abilities')
                ?.FindChildTraverse('Ability' + i);
            if (null == abMain) {
                break;
            } else {
                if (numList[i] == undefined) {
                    let img: AbilityImage = abMain.FindChildTraverse('AbilityImage') as AbilityImage;
                    //找key
                    let abKeyText = abMain?.FindChildTraverse('Hotkey')?.FindChildTraverse('HotkeyText') as LabelPanel;
                    $.Msg(abKeyText);
                    // let keybind = Abilities.GetKeybind(Entities.GetAbilityByName(playerHeroIndex, abKeyText.text));
                    numList[i] = { name: img.abilityname, idx: i, quickCast: false, hotkey: abKeyText?.text.startsWith('[!') ? '' : abKeyText.text };
                    // numList[i] = { name: img.abilityname, idx: i, quickCast: false, hotkey: keybind };

                }
            }
            i++;
        }
        setKeyItem(numList);
    }

    // useGameEvent('add', () => {
    //     //刷新找出全部的技能
    //     let playerHeroIndex: EntityIndex = Players.GetLocalPlayerPortraitUnit();
    //     let getAbility = Entities.GetAbility(playerHeroIndex, 4);
    //     $.Msg('11');
    //     $.Msg(Abilities.GetAbilityName(getAbility));
    // });
    const [keyItem, setKeyItem] = useState<AbilityBindInfoDO[]>([]);
    // const findAllAbility: () => void = () => {
    //     const aa = [0, 1];
    //     const [data] = useXNetTableKey(`test_table`, `test_key`, { data_1: `unknown` });
    //     const string_data = data.data_1;
    //     // test();
    //     // const [result] = useXNetTableKey(`heroTable`, `choiceHero`, { pk1: `unknown` });
    //     // $.Msg('aaaa111');
    //     // $.Msg(result);
    //     return React.useMemo(() => <Label text={`${string_data}`} style={{ width:'100px',height:'200px',border: '8px solid yellow;' }} />, [string_data]);
    //     // return React.useMemo(
    //     //     () => {
    //     //         <Panel id="SettingsKeybindsList">{aa.map((item) => (
    //     //             <KeyBindItem idx={item}/>
    //     //         ))}</Panel>
    //     //     },
    //     //     []);
    // }

    return (
        <Panel id="SettingsRoot">
            <Button id="SettingsClose" onactivate={OnSettingsClose} />
            <Panel id="SettingsContent">
                <Panel id="SettingsKeybinds">
                    <Label className="SettingsSectionTitle" text="键盘绑定" />
                    <Panel id="SettingsKeybindsList">
                        {keyItem.map(item => (
                            <KeyBindItem idx={item.idx} name={item.name} quickCast={item.quickCast} hotkey={item.hotkey} />
                        ))}
                        {/*<KeyBindItem idx={0} />*/}
                    </Panel>
                </Panel>
            </Panel>
        </Panel>
    );
};

// AddKeyBind('F1',()=>{});



function AddKeyBind(keyName: string, keydownCallback?: () => void, keyupCallback?: () => void) {
    // const command = `on${keyName}`;
    let command = `On${keyName}${Date.now()}`;
    // command = '59';
    // $.Msg(command);
    Game.CreateCustomKeyBind(keyName, `+${command}`);
    if (keydownCallback) {
        Game.AddCommand(`+${command}`, keydownCallback, '', 1 << 32);
    }
    if (keyupCallback) {
        Game.AddCommand(`-${command}`, keyupCallback, '', 1 << 32);
    }
}
function AddKeyBindWithNormal(keyName: string, keydownCallback?: () => void, keyupCallback?: () => void) {
    // const command = `on${keyName}`;
    // DOTAKeybindCommand_t.DOTA_KEYBIND_ABILITY_PRIMARY2
    let command = `On${keyName}${Date.now()}`;
    // command = '59';
    // $.Msg(command);
    Game.CreateCustomKeyBind(keyName, `+${command}`);
    if (keydownCallback) {
        Game.AddCommand(`+${command}`, keydownCallback, '', 1 << 32);
    }
    if (keyupCallback) {
        Game.AddCommand(`-${command}`, keyupCallback, '', 1 << 32);
    }
}

let choicePanel: Panel | null;
// type Props = {
//     // name: (name: string) => void;
//     idx: number;
// };
let keyMap = new Map<string, AbilityEntityIndex | undefined>();
let abilityQuickCastSet = new Set<string>();
const KeyBindItem: React.FC<AbilityBindInfoDO> = props => {
    // const { idx } = props;

    function onClick(e: Button) {
        e.SetAttributeInt('idx', props.idx);
        e.AddClass('active');
        e.SetAttributeString('name', props.name);
        choicePanel = e;
        // AddKeyBind(
        //     'c',
        //     () => {
        //         Abilities.ExecuteAbility(getAbility, playerHeroIndex, false);
        //         $.Msg('???1');
        //     },
        //     // () => {
        //     //     $.Msg('???2');
        //     // }
        // );
        // $.Msg(Game.GetKeybindForCommand(DOTAKeybindCommand_t.DOTA_KEYBIND_ABILITY_PRIMARY1));
    }

    function quickCast(e: ToggleButton) {
        if (e.checked) {
            abilityQuickCastSet.add(props.name);
        } else {
            abilityQuickCastSet.add(props.name);
        }
        // abilityQuickCastSet
        // let playerHeroIndex: EntityIndex = Players.GetLocalPlayerPortraitUnit();
        // let getAbility = Entities.GetAbility(playerHeroIndex, 4);
        // $.Msg('11');
        // $.Msg(Abilities.GetAbilityName(getAbility));
        // $.Msg(Entities.GetAbilityByName(playerHeroIndex, 'lone_druid_spirit_bear'));
        // let playerHeroIndex: EntityIndex = Players.GetLocalPlayerPortraitUnit();
        // let getAbility = Entities.GetAbility(playerHeroIndex, 0);
        // $.Msg(Entities.GetAbilityCount(playerHeroIndex));
        // for (let i = 0; i < 35; i++) {
        //     $.Msg(i + ': ' + Abilities.GetAbilityName(Entities.GetAbility(playerHeroIndex, i)));
        // }
        // quickCastList[idx] = e.IsSelected();
        // $.Msg(b);
    }

    function closeHotKey(e: Button) {
        if(choicePanel){
            choicePanel.RemoveClass('active');
            choicePanel = null;
        }
    }

    return (
        <Panel className="CustomKeybindContainer">
            <Panel className="CustomKeybind" acceptsinput={true}>
                <Button id="CustomBinder" className="CustomKeybinder" acceptsinput={true} onactivate={onClick}>
                    <Label id="title" text="" />
                    <Panel id="BindingLabels">
                        <DOTAAbilityImage abilityname={props.name} style={{ opacity: '0.3' }} />
                        <Panel id="BindingLabelsContainer">
                            <Label id="mod" className="BindingRowButton" />
                            <Label id="value" className="BindingRowButton" text={props.hotkey} />
                        </Panel>
                        <Button id="BindingClose"  onactivate={closeHotKey}/>
                    </Panel>
                </Button>
            </Panel>
            {/*<Panel className="CustomKeybindTail">*/}
            {/*    <ToggleButton className="CustomKeybinderToggleButton" onactivate={quickCast}></ToggleButton>*/}
            {/*    <Label id="CustomKeybindTitle" text="快捷施法" />*/}
            {/*</Panel>*/}
        </Panel>
    );
};
render(<KeyBindRoot />, $.GetContextPanel());
