import { BaseAbility, registerAbility } from '../utils/dota_ts_adapter';

@registerAbility()
export class typescript_skywrath_mage_arcane_bolt extends BaseAbility {
    sound_cast: string = 'Hero_SkywrathMage.ArcaneBolt.Cast';
    sound_impact: string = 'Hero_SkywrathMage.ArcaneBolt.Impact';
    projectile_arcane_bolt: string = 'particles/units/heroes/hero_skywrath_mage/skywrath_mage_arcane_bolt.vpcf';

    OnSpellStart() {
        const target = this.GetCursorTarget();

        const bolt_speed = this.GetSpecialValueFor('bolt_speed');
        const bolt_vision = this.GetSpecialValueFor('bolt_vision');

        EmitSoundOn(this.sound_cast, this.GetCaster());

        ProjectileManager.CreateTrackingProjectile({
            Ability: this,
            EffectName: this.projectile_arcane_bolt,
            Source: this.GetCaster(),
            Target: target,
            bDodgeable: false,
            bProvidesVision: true,
            iMoveSpeed: bolt_speed,
            iVisionRadius: bolt_vision,
            iVisionTeamNumber: this.GetCaster().GetTeamNumber(),
        });
    }

}
