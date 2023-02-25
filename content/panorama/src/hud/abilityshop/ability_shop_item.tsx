import 'panorama-polyfill-x/lib/console';
import 'panorama-polyfill-x/lib/timers';

import React from 'react';
import { render } from 'react-panorama-x';

type Props = {
    // name: (name: string) => void;
    name: string;
};
export function AbilityShopItem(props: Props) {
    function bugAbility() {
        GameEvents.SendCustomGameEventToServer('add', { name: props.name });
    }

    return (
        <Panel id="AbilityShopItem">
            <DOTAAbilityImage abilityname={`${props.name}`} className="AbilityShopIcon" showtooltip={true} />
            <Button className={'ButtonBevel AbilityShopBugButton'} onactivate={bugAbility}></Button>
        </Panel>
    );
}
