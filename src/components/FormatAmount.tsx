import { MvxFormatAmount } from "@multiversx/sdk-dapp-ui/react";
import { FormatAmountController } from "@multiversx/sdk-dapp/out/controllers/FormatAmountController";
import { useGetNetworkConfig } from "@multiversx/sdk-dapp/out/react/network/useGetNetworkConfig";
import { DECIMALS, DIGITS } from "@multiversx/sdk-dapp-utils/out/constants";

interface FormatAmountProps {
    value: string;
    className?: string;
    "data-testid"?: string;
    showLabel?: boolean;
}

export default function FormatAmount(props: FormatAmountProps) {
    const {
        network: { egldLabel },
    } = useGetNetworkConfig();

    const { isValid, valueDecimal, valueInteger, label } =
        FormatAmountController.getData({
            digits: DIGITS,
            decimals: DECIMALS,
            egldLabel,
            input: props.value,
        });

    return (
        <MvxFormatAmount
            class={props.className}
            dataTestId={props["data-testid"]}
            isValid={isValid}
            label={label}
            showLabel={props.showLabel}
            valueDecimal={valueDecimal}
            valueInteger={valueInteger}
        />
    );
}
