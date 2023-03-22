declare interface CustomGameEventDeclarations {
    c2s_test_event: {};
    hero_init_ready: {};
    add: { name: string };
    remove: { name: string };
    choose_hero: { name: string | undefined; chooseHeroDeleteAbilityName: string | undefined };
    jj_replace_ability: { inAbilityName: string ; outAbilityName: string  };
    //英雄初始化
    hero_init: HeroInitEvent;
    // dota_game_state_change: { old_state: number; new_state: number };
}
interface HeroInitEvent {
    name: string[];
}
