import { useButtonBase } from '../../../ButtonBase';
import type { CallToActionButtonProps } from '../../CallToActionButton/CallToActionButton';
import type { ButtonProps } from '../Button';

const useGetButtonProps = (
  isLoading: boolean,
  props: Partial<ButtonProps | CallToActionButtonProps>,
  variant?: string
) => {
  const buttonBaseProps = useButtonBase(props);
  const isLink = buttonBaseProps.to || buttonBaseProps.href;
  const shouldShowLoader = isLoading && !props.disabled && !isLink && variant !== 'link';

  return { isLink, shouldShowLoader, buttonBaseProps };
};

export default useGetButtonProps;
