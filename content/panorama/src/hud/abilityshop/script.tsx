import 'panorama-polyfill-x/lib/console';
import 'panorama-polyfill-x/lib/timers';

import React from 'react';
import { render } from 'react-panorama-x';
import { AbilityShopItem } from './ability_shop_item';
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
    'medusa_split_shot',
    'enigma_malefice',
    'snapfire_scatterblast',
    'oracle_fortunes_end',
    'razor_plasma_field',
    'shredder_whirling_death',
    'clinkz_death_pact',
    'void_spirit_aether_remnant',
    'templar_assassin_refraction',
    'lina_dragon_slave',
    'huskar_inner_fire',
    'grimstroke_dark_artistry',
    'magnataur_shockwave',
    'skeleton_king_hellfire_blast',
    'slark_dark_pact',
    'weaver_the_swarm',
    'abaddon_death_coil',
    'sandking_burrowstrike',
    'puck_illusory_orb',
    'antimage_mana_break',
    'legion_commander_overwhelming_odds',
    'pangolier_swashbuckle',
    'bane_nightmare',
];
export function AbilityShop() {
    function clickAbilityShop() {
        $.Msg($('#AbilityShopWindow'));
        $('#AbilityShopWindow').ToggleClass('AbilityShopOpen');
    }

    return (
        <Panel id="AbilityShopContainer">
            <Button id="AbilityShopOpenButton" className={'ButtonBevel'} onactivate={clickAbilityShop}>
                <Label text="技能" />
            </Button>
            <Panel id="AbilityShopWindow">
                {list.map(item => (
                    <AbilityShopItem name={item} />
                ))}
            </Panel>
        </Panel>
    );
}
