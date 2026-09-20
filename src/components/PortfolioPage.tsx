import Header from '@/components/Header';
import ParallaxNumbers from '@/components/ParallaxNumbers';
import RevealObserver from '@/components/RevealObserver';
import SectionHead from '@/components/SectionHead';
import Typewriter from '@/components/Typewriter';
import { getContent, type Locale } from '@/data/content';
import { logos, profile } from '@/data/profile';

const mailto = `mailto:${profile.email}`;
const tel = `tel:+33${profile.phone.replace(/\s/g, '').slice(1)}`;

const Glitch = ({ children }: { children: string }) => (
  <span className="glitch" data-text={children}>
    {children}
  </span>
);

const stagger = (i: number) => ({ '--i': i }) as React.CSSProperties;

export default function PortfolioPage({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const { ui } = c;
  const [main, ...others] = c.projects;

  return (
    <>
      <a href="#about" className="skip">
        {ui.skip}
      </a>
      <Header locale={locale} ui={ui} />
      <RevealObserver />
      <ParallaxNumbers />

      <main id="top">
        {/* HERO */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-slash" aria-hidden="true" />
          <div className="container hero-grid">
            <p className="mono label hero-kicker">
              <span className="slashes" aria-hidden="true">///</span>{' '}
              <Typewriter text={`${ui.kicker} / ${profile.year}`} speed={55} delay={200} />
            </p>

            <h1 id="hero-title" className="hero-name">
              <span className="hero-first">{profile.firstName}</span>
              <span className="hero-last">{profile.lastName}</span>
            </h1>

            <div className="hero-side">
              <p className="badge">
                <span className="dot" aria-hidden="true" /> {ui.badge}
              </p>
              <dl className="meta">
                <div>
                  <dt>{ui.heroMeta.seeking}</dt>
                  <dd>{ui.heroMeta.seekingVal}</dd>
                </div>
                <div>
                  <dt>{ui.heroMeta.start}</dt>
                  <dd>{ui.heroMeta.startVal}</dd>
                </div>
                <div>
                  <dt>{ui.heroMeta.base}</dt>
                  <dd>{profile.city}</dd>
                </div>
              </dl>
            </div>

            <div className="hero-body">
              <p className="hero-role">
                <span className="bracket" aria-hidden="true">[</span>{' '}
                <Typewriter text={c.role} speed={40} delay={900} />{' '}
                <span className="bracket" aria-hidden="true">]</span>
              </p>
              <p className="hero-degree mono">{c.degree}</p>
              <p className="hero-intro">{c.intro}</p>
              <div className="cta-row">
                <a href="#projects" className="btn btn-primary">
                  <Glitch>{ui.ctaProjects}</Glitch> <span aria-hidden="true">↓</span>
                </a>
                <a href={profile.cvFile} download className="btn btn-ghost">
                  <Glitch>{ui.ctaCv}</Glitch> <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section" aria-label={ui.about.title}>
          <div className="container">
            <SectionHead num="01" label={ui.about.label} title={ui.about.title} />
            <div className="about-grid">
              <div className="about-text">
                {c.about.map((p, i) => (
                  <p key={i} className={`reveal${i === 0 ? ' lead' : ''}`}>
                    {p}
                  </p>
                ))}
              </div>
              <aside className="about-aside reveal" aria-label={ui.about.asideAria}>
                <figure className="portrait">
                  <span className="portrait-frame">
                    <img
                      src={profile.photo.src}
                      width={profile.photo.width}
                      height={profile.photo.height}
                      alt={ui.photoAlt}
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                  <figcaption className="mono">
                    {profile.firstName} {profile.lastName} / {profile.city}
                  </figcaption>
                </figure>
                <h3 className="mono label">{ui.about.bring}</h3>
                <ul className="qualities">
                  {c.qualities.map((q) => (
                    <li key={q.name}>
                      <strong>{q.name}</strong>
                      <span>{q.text}</span>
                    </li>
                  ))}
                </ul>
                <h3 className="mono label">{ui.about.languages}</h3>
                <ul className="inline-list">
                  {c.languages.map((l) => (
                    <li key={l.name}>
                      {l.name} <span className="mono lvl">{l.level}</span>
                    </li>
                  ))}
                </ul>
                <h3 className="mono label">{ui.about.offscreen}</h3>
                <ul className="plain-list">
                  {c.extras.interests.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                  <li>{c.extras.mobility}</li>
                </ul>
              </aside>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="section" aria-label={ui.experience.title}>
          <div className="container">
            <SectionHead num="02" label={ui.experience.label} title={ui.experience.title} />
            <ol className="timeline">
              {c.experiences.map((e, i) => {
                const logo = e.logo && logos[e.logo];
                return (
                  <li key={i} className="tl-item reveal">
                    <div className="tl-when">
                      <p className="mono">{e.period}</p>
                      {e.status && <p className="tag tag-red">{e.status}</p>}
                    </div>
                    <div className="tl-what">
                      <div className="tl-head">
                        <h3 className="tl-company">{e.company}</h3>
                        {logo && (
                          <span className="logo-tile">
                            <img src={logo.src} width={logo.width} height={logo.height} alt={logo.alt} loading="lazy" decoding="async" />
                          </span>
                        )}
                      </div>
                      <p className="tl-role">
                        {e.role} <span className="mono tl-place">/ {e.place}</span>
                      </p>
                      <ul className="missions">
                        {e.missions.map((m) => (
                          <li key={m.label}>
                            <strong>{m.label}</strong> — {m.text}
                          </li>
                        ))}
                      </ul>
                      <ul className="tags" aria-label={ui.experience.tagsAria}>
                        {e.tags.map((t) => (
                          <li key={t} className="tag">
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="section" aria-label={ui.projects.title}>
          <div className="container">
            <SectionHead num="03" label={ui.projects.label} title={ui.projects.title} />

            <article className="project-main reveal">
              <div className="pm-top">
                <span className="pm-num" aria-hidden="true">{main.number}</span>
                <p className="mono">{main.year}</p>
              </div>
              <h3 className="pm-title">{main.name}</h3>
              <p className="pm-summary">{main.summary}</p>
              <div className="pm-cols">
                <div>
                  <h4 className="mono label">{ui.projects.goal}</h4>
                  <p>{main.goal}</p>
                </div>
                <div>
                  <h4 className="mono label">{ui.projects.done}</h4>
                  <p>{main.done}</p>
                </div>
              </div>
              <ul className="tags" aria-label={ui.projects.stackAria}>
                {main.stack.map((t) => (
                  <li key={t} className="tag tag-light">
                    {t}
                  </li>
                ))}
              </ul>
              <span className="pm-arrow" aria-hidden="true">↗</span>
            </article>

            <div className="project-side">
              {others.map((p) => (
                <article key={p.number} className="project-card reveal">
                  <div className="pc-top">
                    <span className="pc-num" aria-hidden="true">{p.number}</span>
                    <p className="mono">{p.year}</p>
                  </div>
                  <h3 className="pc-title">{p.name}</h3>
                  <p className="pc-summary">{p.summary}</p>
                  <p><span className="mono label">{ui.projects.goal} · </span>{p.goal}</p>
                  <p><span className="mono label">{ui.projects.done} · </span>{p.done}</p>
                  <ul className="tags" aria-label={ui.projects.stackAria}>
                    {p.stack.map((t) => (
                      <li key={t} className="tag">
                        {t}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="section" aria-label={ui.skills.title}>
          <div className="container">
            <SectionHead num="04" label={ui.skills.label} title={ui.skills.title} />
            <div className="skills-grid">
              {c.skills.map((g, i) => (
                <div key={g.title} className="skill-group reveal" style={stagger(i % 3)}>
                  <h3 className="mono label">{g.title}</h3>
                  <ul className="tags">
                    {g.items.map((t) => (
                      <li key={t} className={`tag${g.featured?.includes(t) ? ' tag-big' : ''}`}>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="edu">
              <h3 className="mono label reveal">{ui.skills.education}</h3>
              <ol>
                {c.education.map((e) => {
                  const logo = e.logo && logos[e.logo];
                  return (
                    <li key={e.title} className="edu-item reveal">
                      <p className="mono edu-period">{e.period}</p>
                      <div>
                        <p className="edu-title">{e.title}</p>
                        <p className="edu-school">
                          {e.school}
                          {e.detail ? ` · ${e.detail}` : ''}
                        </p>
                      </div>
                      <div className="edu-side">
                        {logo && (
                          <span className="logo-tile">
                            <img src={logo.src} width={logo.width} height={logo.height} alt={logo.alt} loading="lazy" decoding="async" />
                          </span>
                        )}
                        {e.note && <p className="tag">{e.note}</p>}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="contact" aria-label={ui.contact.label}>
          <div className="container">
            <p className="mono label reveal">05 / {ui.contact.label}</p>
            <h2 className="contact-title reveal">
              <span>{ui.contact.lines[0]}</span>
              <span>{ui.contact.lines[1]}</span>
              <span className="red">{ui.contact.lines[2]}</span>
            </h2>
            <a href={mailto} className="contact-mail reveal">
              {profile.email}
            </a>
            <div className="contact-row reveal">
              <a href={mailto} className="btn btn-primary">
                <Glitch>{ui.contact.button}</Glitch> <span aria-hidden="true">↗</span>
              </a>
              <ul className="contact-links">
                <li>
                  <a href={tel} className="link-u">
                    {profile.phone}
                  </a>
                </li>
                {profile.linkedin && (
                  <li>
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="link-u">
                      LinkedIn ↗
                    </a>
                  </li>
                )}
                {profile.github && (
                  <li>
                    <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link-u">
                      GitHub ↗
                    </a>
                  </li>
                )}
                <li>
                  <a href={profile.cvFile} target="_blank" rel="noopener" className="link-u">
                    {ui.contact.cvLink} ↗
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <p className="mono">
            © {new Date().getFullYear()} {profile.firstName} {profile.lastName}
          </p>
          <ul className="footer-links mono">
            {profile.github && (
              <li>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link-u">GitHub</a>
              </li>
            )}
            {profile.linkedin && (
              <li>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="link-u">LinkedIn</a>
              </li>
            )}
            <li>
              <a href={mailto} className="link-u">{ui.footer.email}</a>
            </li>
          </ul>
          <p className="mono">{ui.footer.designed} {profile.firstName} {profile.lastName}</p>
        </div>
      </footer>
    </>
  );
}
