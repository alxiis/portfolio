import Header from '@/components/Header';
import RevealObserver from '@/components/RevealObserver';
import SectionHead from '@/components/SectionHead';
import {
  about,
  education,
  experiences,
  extras,
  intro,
  languages,
  profile,
  projects,
  qualities,
  skills,
} from '@/data/profile';

const mailto = `mailto:${profile.email}`;
const tel = `tel:+33${profile.phone.replace(/\s/g, '').slice(1)}`;

export default function Home() {
  const [main, ...others] = projects;

  return (
    <>
      <a href="#about" className="skip">
        Aller au contenu
      </a>
      <Header />
      <RevealObserver />

      <main id="top">
        {/* HERO */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-slash" aria-hidden="true" />
          <div className="container hero-grid">
            <p className="mono label hero-kicker">
              <span className="slashes" aria-hidden="true">///</span> Portfolio / {profile.year}
            </p>

            <h1 id="hero-title" className="hero-name">
              <span className="hero-first">{profile.firstName}</span>
              <span className="hero-last">{profile.lastName}</span>
            </h1>

            <div className="hero-side">
              <p className="badge">
                <span className="dot" aria-hidden="true" /> À la recherche d&apos;une alternance
              </p>
              <dl className="meta">
                <div>
                  <dt>Recherche</dt>
                  <dd>Master Cybersécurité / Informatique</dd>
                </div>
                <div>
                  <dt>Rentrée</dt>
                  <dd>Septembre 2027</dd>
                </div>
                <div>
                  <dt>Base</dt>
                  <dd>{profile.city}</dd>
                </div>
              </dl>
            </div>

            <div className="hero-body">
              <p className="hero-role">
                <span className="bracket" aria-hidden="true">[</span> {profile.role}{' '}
                <span className="bracket" aria-hidden="true">]</span>
              </p>
              <p className="hero-degree mono">{profile.degree}</p>
              <p className="hero-intro">{intro}</p>
              <div className="cta-row">
                <a href="#projects" className="btn btn-primary">
                  Voir mes projets <span aria-hidden="true">↓</span>
                </a>
                <a href={profile.cvFile} download className="btn btn-ghost">
                  Télécharger mon CV <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section" aria-label="À propos">
          <div className="container">
            <SectionHead num="01" label="Profile" title="À propos" />
            <div className="about-grid">
              <div className="about-text">
                {about.map((p, i) => (
                  <p key={i} className={`reveal${i === 0 ? ' lead' : ''}`}>
                    {p}
                  </p>
                ))}
              </div>
              <aside className="about-aside reveal" aria-label="Qualités et informations">
                <h3 className="mono label">Ce que j&apos;apporte</h3>
                <ul className="qualities">
                  {qualities.map((q) => (
                    <li key={q.name}>
                      <strong>{q.name}</strong>
                      <span>{q.text}</span>
                    </li>
                  ))}
                </ul>
                <h3 className="mono label">Langues</h3>
                <ul className="inline-list">
                  {languages.map((l) => (
                    <li key={l.name}>
                      {l.name} <span className="mono lvl">{l.level}</span>
                    </li>
                  ))}
                </ul>
                <h3 className="mono label">Hors écran</h3>
                <ul className="plain-list">
                  {extras.interests.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                  <li>{extras.mobility}</li>
                </ul>
              </aside>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="section" aria-label="Expérience">
          <div className="container">
            <SectionHead num="02" label="Experience" title="Expérience" />
            <ol className="timeline">
              {experiences.map((e, i) => (
                <li key={i} className="tl-item reveal">
                  <div className="tl-when">
                    <p className="mono">{e.period}</p>
                    {e.status && <p className="tag tag-red">{e.status}</p>}
                  </div>
                  <div className="tl-what">
                    <h3 className="tl-company">{e.company}</h3>
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
                    <ul className="tags" aria-label="Technologies et compétences">
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
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="section" aria-label="Projets">
          <div className="container">
            <SectionHead num="03" label="Projects" title="Projets" />

            <article className="project-main reveal">
              <div className="pm-top">
                <span className="pm-num" aria-hidden="true">{main.number}</span>
                <p className="mono">{main.year}</p>
              </div>
              <h3 className="pm-title">{main.name}</h3>
              <p className="pm-summary">{main.summary}</p>
              <div className="pm-cols">
                <div>
                  <h4 className="mono label">Objectif</h4>
                  <p>{main.goal}</p>
                </div>
                <div>
                  <h4 className="mono label">Réalisé</h4>
                  <p>{main.done}</p>
                </div>
              </div>
              <ul className="tags" aria-label="Stack">
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
                  <p><span className="mono label">Objectif · </span>{p.goal}</p>
                  <p><span className="mono label">Réalisé · </span>{p.done}</p>
                  <ul className="tags" aria-label="Stack">
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
        <section id="skills" className="section" aria-label="Compétences">
          <div className="container">
            <SectionHead num="04" label="Skills" title="Compétences" />
            <div className="skills-grid">
              {skills.map((g) => (
                <div key={g.title} className="skill-group reveal">
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
              <h3 className="mono label reveal">Formation</h3>
              <ol>
                {education.map((e) => (
                  <li key={e.title} className="edu-item reveal">
                    <p className="mono edu-period">{e.period}</p>
                    <div>
                      <p className="edu-title">{e.title}</p>
                      <p className="edu-school">
                        {e.school}
                        {e.detail ? ` · ${e.detail}` : ''}
                      </p>
                    </div>
                    {e.note && <p className="tag">{e.note}</p>}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="contact" aria-label="Contact">
          <div className="container">
            <p className="mono label reveal">05 / Contact</p>
            <h2 className="contact-title reveal">
              <span>Un projet ?</span>
              <span>Une alternance ?</span>
              <span className="red">Parlons-en.</span>
            </h2>
            <a href={mailto} className="contact-mail reveal">
              {profile.email}
            </a>
            <div className="contact-row reveal">
              <a href={mailto} className="btn btn-primary">
                Me contacter <span aria-hidden="true">↗</span>
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
                    CV (PDF) ↗
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
              <a href={mailto} className="link-u">Email</a>
            </li>
          </ul>
          <p className="mono">Designed &amp; developed by {profile.firstName} {profile.lastName}</p>
        </div>
      </footer>
    </>
  );
}
