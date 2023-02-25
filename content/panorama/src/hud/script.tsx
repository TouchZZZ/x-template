import 'panorama-polyfill-x/lib/console';
import 'panorama-polyfill-x/lib/timers';

import React from 'react';
import { render } from 'react-panorama-x';
import { useXNetTableKey } from '../hooks/useXNetTable';
// import './abilityshop/script.tsx';
import { AbilityShop } from './abilityshop/script';

const Test: React.FC = () => {
    const [data] = useXNetTableKey(`test_table`, `test_key`, { data_1: `unknown` });
    const string_data = data.data_1;
    test();
    return React.useMemo(() => <Label text={`${string_data}`} />, [string_data]);
};
//id="ButtonContainer"
render(<MapPanel />, $.GetContextPanel());
function MapPanel() {
    return (
        <Panel className="root">
            <Panel id={'ButtonContainer'}>
                <Panel className="root FlowContainer" style={{ width: '300px', height: '300px' }}>
                    <Button className="ButtonBevel" onactivate={test}>
                        <Label text="添加" />
                    </Button>
                    <Button className="ButtonBevel" onactivate={test1}>
                        <Label text="删除" />
                    </Button>
                </Panel>
                <Panel className="FlowContainer" style={{ width: '300px', height: '300px' }}>
                    <DOTAAbilityImage
                        id="RewardAbilityImage"
                        abilityname={'ursa_overpower'}
                        className="RewardIcon"
                        style={{ width: '50px', height: '50px' }}
                        showtooltip={true}
                    />
                    <DOTAAbilityImage
                        id="RewardAbilityImage1"
                        abilityname={'ursa_enrage'}
                        className="RewardIcon"
                        style={{ width: '50px', height: '50px' }}
                        showtooltip={true}
                    />
                </Panel>
            </Panel>
            <AbilityShop />

        </Panel>
    );
}
// src={'file://{images}/spellicons/ursa_overpower.png'}
const list: Array<string> = [
    'lone_druid_spirit_bear',
    'death_prophet_carrion_swarm',
    'drow_ranger_frost_arrows',
    'pugna_nether_blast',
    'naga_siren_mirror_image',
    'wisp_tether',
    'ogre_magi_fireblast',
    'tidehunter_gush',
    'slardar_sprint',
    'jakiro_dual_breath',
    'windrunner_shackleshot',
    'tiny_avalanche',
    'morphling_waveform',
    'monkey_king_boundless_strike',
    'lycan_summon_wolves',
];

function test() {
    let img = $('#RewardAbilityImage') as AbilityImage;
    const randomNumber: number = Math.floor(Math.random() * list.length);
    img.abilityname = list[randomNumber];
    // ($( "#RewardAbilityImage" ) as DOTAAbilityImage )='file://{images}/spellicons/ursa_overpower.png'
    // let image: DOTAAbilityImage = $('#RewardAbilityImage') as DOTAAbilityImage;
    // image.
    // $( "#RewardAbilityImage" ).abilityname;
    GameEvents.SendCustomGameEventToServer('add', { name: list[randomNumber] });
    let button = $('#ShopButton');
    $.Msg(button);
}
function test1() {
    let img = $('#RewardAbilityImage1') as AbilityImage;
    const randomNumber: number = Math.floor(Math.random() * list.length);
    img.abilityname = list[randomNumber];
    GameEvents.SendCustomGameEventToServer('remove', { name: list[randomNumber] });
}
console.log(`Hello, world!`);
