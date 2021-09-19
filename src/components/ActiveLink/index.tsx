import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, cloneElement } from 'react';

// Extending properties inherited from Next Link,
// doing that to be able to receive href and other
// attributes in our component as props
interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
  activeClassName: string;
}

export function ActiveLink({
  children,
  activeClassName,
  ...rest
}: ActiveLinkProps) {
  const { asPath } = useRouter();

  // Check if the path is the same as href to add
  // the active class name
  const className = asPath === rest.href ? activeClassName : '';

  return (
    <Link {...rest}>
      {/* 
        Clonning children element to be able to add
        attributes on it
      */}
      {cloneElement(children, {
        className,
      })}
    </Link>
  );
}
