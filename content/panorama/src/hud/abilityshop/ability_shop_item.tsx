import 'panorama-polyfill-x/lib/console';
import 'panorama-polyfill-x/lib/timers';

import React from 'react';

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
    // const renderItems = () => {
    //     return props.items.map((item) => <div key={item}>{item}</div>);
    // };

    return (
        <Panel id="AbilityShopItem" hittest={false}>
            <DOTAAbilityImage abilityname={`${props.name}`} className="AbilityShopIcon" showtooltip={true} />
            <Button className={'ButtonClass AbilityShopBuyButton'} onactivate={bugAbility}>
                <Label className={'AbilityShopBugButtonLabel'} text={`${props.gold}`}></Label>
                {/*<Label text="技能" />*/}
                <Panel className={'AbilityShopBugButtonIcon'}></Panel>
            </Button>
        </Panel>
    );
}
