import React from "react";
import {useXNetTableKey} from "../../hooks/useXNetTable";
import {DOTAAbilityImageAttributes} from "react-panorama-x";

export const CommonDialog: React.FC = () => {
    const [data] = useXNetTableKey(`heroInfoTable`, `abilities`, { name: [] });
    let abilities = data.name;

    function onClick(e: Panel) {
        let panel: DOTAAbilityImageAttributes = e.FindChildTraverse('abilityImage') as DOTAAbilityImageAttributes;
        let outAbilityName = panel?.abilityname;
        let dialog = $('#CommonDialogContainer');
        dialog.AddClass('hide');
        let inAbilityName = dialog.GetAttributeString('abilityName', '');

        $.Msg(inAbilityName);
        $.Msg(outAbilityName);
        if (inAbilityName && outAbilityName) {
            GameEvents.SendCustomGameEventToServer('jj_replace_ability', { inAbilityName: inAbilityName, outAbilityName: outAbilityName });
        }
    }

    function onClose(e: Panel) {
        e.GetParent()?.AddClass('hide');
    }

    return (
        <Panel id={'CommonDialogContainer'} className={'CommonDialogContainer hide'}>
            <Button className="CommonDialogClose" onactivate={onClose} />
            <Panel className="CommonDialogContent">
                <Label className="CommonDialogTitle" text="选择一个位置替换技能" />
                <Panel className="CommonDialogBody">
                    {abilities?.map((item, index) => (
                        <Panel className="CustomKeybindContainer">
                            <Panel className="CustomKeybind" acceptsinput={true}>
                                <Button id="CustomBinder" className="CustomKeybinder" acceptsinput={true} onactivate={onClick}>
                                    <Label id="title" text="" />
                                    <Panel id="BindingLabels">
                                        <DOTAAbilityImage id={'abilityImage'} abilityname={item} style={{ opacity: '0.3' }} />
                                        <Panel id="BindingLabelsContainer">
                                            <Label id="mod" className="BindingRowButton" />
                                            <Label id="value" className="BindingRowButton" text={index + 1} />
                                        </Panel>
                                        <Button id="BindingClose" />
                                    </Panel>
                                </Button>
                            </Panel>
                        </Panel>
                    ))}
                </Panel>
            </Panel>

        </Panel>
    );
};
