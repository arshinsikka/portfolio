import { Block, TextLink } from "@/components/primitives";
import { contact } from "@/content/profile";

/**
 * A labelled entry: the mono caption above, the address or number below as a
 * link. Same shape as a rail label over its content, one level down.
 */
function Entry({
  label,
  href,
  children,
}: {
  label: string;
  href: string;
  children: string;
}) {
  return (
    <div>
      <p className="font-mono text-label uppercase text-ink-muted">{label}</p>
      <p className="mt-s1">
        <TextLink href={href} external className="text-body">
          {children}
        </TextLink>
      </p>
    </div>
  );
}

export default function Contact() {
  return (
    <Block label={contact.heading}>
      <p className="max-w-lead font-display text-lead text-ink-muted">
        {contact.subtitle}
      </p>

      <div className="mt-s5 grid gap-x-s6 gap-y-s5 md:grid-cols-2">
        <div className="border-t border-rule pt-s3">
          <h3 className="font-mono text-label uppercase text-ink">
            {contact.phone.heading}
          </h3>
          <div className="mt-s3">
            <Entry label={contact.phone.label} href={contact.phone.href}>
              {contact.phone.display}
            </Entry>
          </div>
        </div>

        <div className="border-t border-rule pt-s3">
          <h3 className="font-mono text-label uppercase text-ink">
            {contact.email.heading}
          </h3>
          <div className="mt-s3 flex flex-col gap-s3">
            <Entry
              label={contact.email.primary.label}
              href={contact.email.primary.href}
            >
              {contact.email.primary.address}
            </Entry>
            <Entry
              label={contact.email.secondary.label}
              href={contact.email.secondary.href}
            >
              {contact.email.secondary.address}
            </Entry>
          </div>
        </div>
      </div>
    </Block>
  );
}
