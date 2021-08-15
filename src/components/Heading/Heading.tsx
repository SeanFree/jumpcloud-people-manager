import { ReactChild, ReactChildren } from "react";
import { useClassNames } from "hooks";
import { FC } from "react";
import './Heading.scss';

interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
  content?: ReactChildren | ReactChild | string;
  nowrap?: boolean;
}

const Heading: FC<HeadingProps> = ({
  as: Tag = 'h6',
  children,
  className,
  content,
  nowrap = false,
}) => {
  const classNames = useClassNames({
    [className as string]: !!className,
    heading: true,
    [`heading--${Tag}`]: true,
    'heading--nowrap': nowrap
  });

  return (
    <Tag className={classNames}>{content || children}</Tag>
  );
};

export default Heading;
