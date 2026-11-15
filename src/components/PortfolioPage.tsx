import Header from '@/components/Header';
import ParallaxNumbers from '@/components/ParallaxNumbers';
import RevealObserver from '@/components/RevealObserver';
import SectionHead from '@/components/SectionHead';
import Typewriter from '@/components/Typewriter';
import { getContent, type Content, type Locale } from '@/data/content';
import { logos, profile } from '@/data/profile';

const mailto = `mailto:${profile.email}`;
const tel = `tel:+33${profile.phone.replace(/\s/g, '').slice(1)}`;
const fullName = `${profile.firstName} ${profile.lastName}`;

type Experience = Content['experiences'][number];
type Project = Content['projects'][number];

const Glitch = ({ children }: { children: string }) => (
  <span className="glitch" data-text={children}>
    {children}
  </span>
);

const stagger = (i: number) => ({ '--i': i }) as React.CSSProperties;

/** Regroupe les postes consécutifs dans la même entreprise (stage puis alternance, par ex.). */
function groupByCompany(list: Experience[]): Experience[][] {
  const groups: Experience[][] = [];
  for (const e of list) {
    const last = groups[groups.length - 1];
    if (last && last[0].company === e.company && last[0].place === e.place) last.push(e);
    else groups.push([e]);
  }
  return groups;
}

/** Liens d'un projet : rien n'est affiché tant que `github` / `live` ne sont pas renseignés. */
function ProjectLinks({ p, ui }: { p: Project; ui: Content['ui'] }) {
  if (!p.github && !p.live) return null;
  return (
    <p className="project-links mono">
      {p.github && (
        <a href={p.github} target="_blank" rel="noopener noreferrer" className="link-u">
          {ui.projects.code} <span aria-hidden="true">↗</span>
        </a>
      )}
      {p.live && (
        <a href={p.live} target="_blank" rel="noopener noreferrer" className="link-u">
          {ui.projects.live} <span aria-hidden="true">↗</span>
        </a>
      )}
    </p>
  );
}

export default function PortfolioPage({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const { ui } = c;
  const [main, ...others] = c.projects;

  // Ce que je cherche, affiché dans la fenêtre « terminal » du hero.
  const objective = [
    [ui.heroMeta.seeking, ui.heroMeta.seekingVal],
    [ui.heroMeta.start, ui.heroMeta.startVal],
    [ui.heroMeta.base, `${profile.city} · ${c.extras.mobility}`],
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: fullName,
    jobTitle: c.role,
    description: c.intro,
    knowsAbout: c.domains,
    sameAs: [profile.linkedin, profile.github].filter(Boolean),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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

            <div className="hero-side">
              <p className="badge">
                <span className="dot" aria-hidden="true" /> {ui.badge}
              </p>
              <div className="term">
                <p className="term-bar mono" aria-hidden="true">
                  <span className="term-dots">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span>~/{ui.termTitle}</span>
                </p>
                <dl className="term-body">
                  {objective.map(([key, value]) => (
                    <div key={key}>
                      <dt>
                        <span className="term-prompt" aria-hidden="true">$ cat </span>
                        {key}
                      </dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* Bandeau des domaines visés (décoratif : le contenu est déjà dans l'intro) */}
        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {[0, 1].map((g) => (
              <ul key={g} className="ticker-group">
                {[0, 1, 2].flatMap((r) =>
                  c.domains.map((d, i) => (
                    <li key={`${r}-${d}`} className={i % 2 ? 'is-outline' : undefined}>
                      {d}
                      <span className="ticker-sep">/</span>
                    </li>
                  )),
                )}
              </ul>
            ))}
          </div>
        </div>

        {/* ABOUT */}
        <section id="about" className="section" aria-label={ui.about.title}>
          <div className="container">
            <SectionHead num="01" label={ui.about.label} title={ui.about.title} />
            <div className="about-grid">
              <figure className="portrait reveal">
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
                  {fullName} / {profile.city}
                </figcaption>
              </figure>
              <div className="about-text">
                {c.about.map((p, i) => (
                  <p key={i} className={`reveal${i === 0 ? ' lead' : ''}`}>
                    {p}
                  </p>
                ))}
              </div>
            </div>

            <div className="about-facts" role="group" aria-label={ui.about.asideAria}>
              <div className="fact fact-wide reveal">
                <h3 className="mono label">{ui.about.bring}</h3>
                <ul className="qualities">
                  {c.qualities.map((q) => (
                    <li key={q.name}>
                      <strong>{q.name}</strong>
                      <span>{q.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="fact fact-stack reveal" style={stagger(1)}>
                <div>
                  <h3 className="mono label">{ui.about.languages}</h3>
                  <ul className="inline-list">
                    {c.languages.map((l) => (
                      <li key={l.name}>
                        {l.name} <span className="mono lvl">{l.level}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mono label">{ui.about.offscreen}</h3>
                  <ul className="plain-list">
                    {c.extras.interests.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                    <li>{c.extras.mobility}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="section" aria-label={ui.experience.title}>
          <div className="container">
            <SectionHead num="02" label={ui.experience.label} title={ui.experience.title} />
            <ol className="timeline">
              {groupByCompany(c.experiences).map((group) => {
                const [first] = group;
                const logo = first.logo && logos[first.logo];
                return (
                  <li key={`${first.company}-${first.period}`} className="tl-group">
                    <div className="tl-head reveal">
                      <h3 className="tl-company">{first.company}</h3>
                      {logo && (
                        <span className="logo-tile">
                          <img src={logo.src} width={logo.width} height={logo.height} alt={logo.alt} loading="lazy" decoding="async" />
                        </span>
                      )}
                      <p className="mono tl-place">{first.place}</p>
                    </div>
                    <ol className="tl-roles">
                      {group.map((e) => (
                        <li key={e.period} className={`tl-item reveal${e.current ? ' is-current' : ''}`}>
                          <div className="tl-when">
                            <p className="mono">{e.period}</p>
                            {e.status && <p className={`tag${e.current ? ' tag-red' : ''}`}>{e.status}</p>}
                          </div>
                          <div className="tl-what">
                            <h4 className="tl-role">{e.role}</h4>
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
                      ))}
                    </ol>
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
              {main.layers ? (
                <div className="rack">
                  <h4 className="mono label">{ui.projects.layers}</h4>
                  <dl>
                    {main.layers.map((l, i) => (
                      <div key={l.role} className="rack-row">
                        <span className="rack-idx mono" aria-hidden="true">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <dt className="mono">{l.role}</dt>
                        <dd>{l.tools}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ) : (
                <ul className="tags" aria-label={ui.projects.stackAria}>
                  {main.stack.map((t) => (
                    <li key={t} className="tag tag-light">
                      {t}
                    </li>
                  ))}
                </ul>
              )}
              <ProjectLinks p={main} ui={ui} />
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
                  <ProjectLinks p={p} ui={ui} />
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
            <ul className="contact-recap mono reveal" aria-label={ui.contact.recapAria}>
              <li>{ui.heroMeta.seekingVal}</li>
              <li>{ui.heroMeta.startVal}</li>
              <li>{profile.city}</li>
              <li>{c.extras.mobility}</li>
            </ul>
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
            © {new Date().getFullYear()} {fullName}
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
          <p className="mono">{ui.footer.designed} {fullName}</p>
        </div>
      </footer>
    </>
  );
}
