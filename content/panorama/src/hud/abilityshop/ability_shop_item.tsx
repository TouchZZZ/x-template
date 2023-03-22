import 'panorama-polyfill-x/lib/console';
import 'panorama-polyfill-x/lib/timers';

import React from 'react';
import {DOTAAbilityImageAttributes} from "react-panorama-x";

type Props = {
    // name: (name: string) => void;
    name: string;
    gold: number;
};

export function AbilityShopItem(props: Props) {
    function bugAbility() {
        GameEvents.SendEventClientSide('dota_hud_error_message', { reason: 1, message: '重复' });
        // SendEventClientSide.send
        GameEvents.SendCustomGameEventToServer('add', { name: props.name });
    }
    function clickAbility(e: Panel) {
        //弹出技能栏选项，选择替换位置
        let panel = $('#CommonDialogContainer');
        panel.RemoveClass('hide');

        let abImg = e.GetParent()?.FindChild('AbilityShopItemAbilityImage') as DOTAAbilityImageAttributes;
        let abilityname = abImg.abilityname;
        if (abilityname) {
            panel.SetAttributeString('abilityName', abilityname);
        }
    }

    // const renderItems = () => {
    //     return props.items.map((item) => <div key={item}>{item}</div>);
    // };

    return (
        <Panel id="AbilityShopItem" hittest={false}>
            <DOTAAbilityImage id={'AbilityShopItemAbilityImage'} abilityname={`${props.name}`} className="AbilityShopIcon" showtooltip={true} />
            <Button className={'ButtonClass AbilityShopBuyButton'} onactivate={clickAbility}>
                <Label className={'AbilityShopBugButtonLabel'} text={`${props.gold}`}></Label>
                {/*<Label text="技能" />*/}
                <Panel className={'AbilityShopBugButtonIcon'}></Panel>
            </Button>
        </Panel>
    );
}
