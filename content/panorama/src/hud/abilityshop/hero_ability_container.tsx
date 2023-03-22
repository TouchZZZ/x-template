import 'panorama-polyfill-x/lib/console';
import 'panorama-polyfill-x/lib/timers';

import React from 'react';
import {CommonDialog} from "../common/common_dialog";

type Props = {
    // name: (name: string) => void;
    name: string;
    gold: number;
};

export function HeroAbilityContainer() {

    return (
        <CommonDialog></CommonDialog>
        // <Panel id="HeroAbilityReplaceContainer">
        //     <Label className="HeroAbilityReplaceTitle" text="选择一个位置替换技能" />
        //     <Button id="HeroAbilityReplaceClose" />
        //     <Panel id="SettingsKeybindsList">
        //         <Button id="CustomBinder" className="HeroAbilityReplaceIconItem" acceptsinput={true}>
        //             {/*<Panel id="BindingLabels" style={{ width: '84px', height: '84px' }}>*/}
        //             {/*    /!*<DOTAAbilityImage abilityname={'props.name'} style={{ opacity: '0.3' }} />*!/*/}
        //             {/*    /!*<Panel id="BindingLabelsContainer">*!/*/}
        //             {/*    /!*    <Label id="mod" className="BindingRowButton" />*!/*/}
        //             {/*    /!*    <Label id="value" className="BindingRowButton" text={'props.hotkey'} />*!/*/}
        //             {/*    /!*</Panel>*!/*/}
        //
        //             {/*</Panel>*/}
        //             <Label id="title" text="" />
        //             <Panel id="BindingLabels">
        //                 <DOTAAbilityImage abilityname={'mars_spear'} style={{ opacity: '0.3' }} />
        //                 <Panel id="BindingLabelsContainer">
        //                     <Label id="mod" className="BindingRowButton" />
        //                     <Label id="value" className="BindingRowButton" />
        //                 </Panel>
        //             </Panel>
        //         </Button>
        //     </Panel>
        //
        // </Panel>
    )
}
