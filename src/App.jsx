import { useState, useEffect } from 'react'

/* ====== EDITE AQUI ====== */
const ME = {
  nome: 'Seu Nome',
  email: 'seuemail@exemplo.com',
  github: 'https://github.com/seuusuario',
  linkedin: 'https://linkedin.com/in/seuusuario',
}
const USO = [
  ['JavaScript', '#f7df1e'], ['TypeScript', '#3178c6'], ['React', '#61dafb'], ['HTML', '#e34f26'],
  ['CSS', '#1572b6'], ['Supabase', '#3ecf8e'], ['Git e GitHub', '#f05032'],
]
const FACULDADE = [['Java', '#f89820'], ['Python', '#3776ab']]
const PROJETOS = [ // troque pelos seus projetos reais
  { nome: 'Projeto um', desc: 'Uma frase sobre o que faz e para quem.', tech: 'React · Supabase', link: '#' },
  { nome: 'Projeto dois', desc: 'Uma frase sobre o que faz e para quem.', tech: 'TypeScript · React', link: '#' },
  { nome: 'Projeto três', desc: 'Uma frase sobre o que faz e para quem.', tech: 'JavaScript · CSS', link: '#' },
]
const ABAS = ['Início', 'Sobre mim', 'Tecnologias', 'Projetos', 'Contato']
/* ======================== */

const Chip = ({ nome, cor, lite }) => (
  <span className={'chip' + (lite ? ' lite' : '')}><i style={{ '--c': cor }} />{nome}</span>
)

function Sobre() {
  const [semFoto, setSemFoto] = useState(false)
  return (
    <div className="about">
      <div className="photo">
        {semFoto
          ? 'Coloque foto.jpg na pasta public'
          : <img src={import.meta.env.BASE_URL + 'foto.jpg'} alt={'Foto de ' + ME.nome} onError={() => setSemFoto(true)} />}
      </div>
      <div>
        <h2>Sobre mim</h2>
        <p>Estudo programação de forma autodidata há quase 2 anos. Há um ano comecei Sistemas de Informação na Uniube, em Uberlândia.</p>
        <p>Já criei projetos completos com JavaScript e React, uso Supabase como banco de dados e trabalho todo dia com Git e GitHub.</p>
      </div>
    </div>
  )
}

const TELAS = [
  () => (
    <div className="hero">
      <h1>Oi, eu sou<br />{ME.nome}.</h1>
      <p>Desenvolvedor front-end em formação, de Uberlândia. Construo interfaces com React e TypeScript.</p>
    </div>
  ),
  Sobre,
  () => (
    <>
      <h2>Tecnologias</h2>
      <div className="skills">
        <div className="group"><h3>Que uso nos meus projetos</h3>
          <div className="chips">{USO.map(([n, c]) => <Chip key={n} nome={n} cor={c} />)}</div></div>
        <div className="group"><h3>Aprendendo na faculdade</h3>
          <div className="chips">{FACULDADE.map(([n, c]) => <Chip key={n} nome={n} cor={c} lite />)}</div></div>
      </div>
    </>
  ),
  () => (
    <>
      <h2>Projetos</h2>
      <div className="projects">
        {PROJETOS.map(p => (
          <article className="card" key={p.nome}>
            <h3>{p.nome}</h3><p className="soft">{p.desc}</p><p className="soft">{p.tech}</p>
            <a href={p.link} target="_blank" rel="noopener">Ver projeto</a>
          </article>
        ))}
      </div>
    </>
  ),
  () => (
    <>
      <h2>Vamos conversar</h2>
      <p>Estou aberto a estágios e projetos.</p>
      <div className="links">
        <a href={'mailto:' + ME.email}>{ME.email}</a>
        <a href={ME.github} target="_blank" rel="noopener">GitHub</a>
        <a href={ME.linkedin} target="_blank" rel="noopener">LinkedIn</a>
      </div>
    </>
  ),
]

export default function App() {
  const [aba, setAba] = useState(0)
  useEffect(() => {
    const k = e => {
      if (e.key === 'ArrowRight') setAba(a => (a + 1) % ABAS.length)
      if (e.key === 'ArrowLeft') setAba(a => (a + ABAS.length - 1) % ABAS.length)
    }
    addEventListener('keydown', k)
    return () => removeEventListener('keydown', k)
  }, [])

  return (
    <>
      <svg className="bg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path className="a" d="M-20 130C120 40 220 220 360 120" />
        <path className="b" d="M900 70C1010-10 1120 90 1230 30" />
        <path className="a" d="M1010 700C1100 620 1160 760 1240 690" />
        <path className="b" d="M-30 690C80 760 170 640 290 720" />
        <path className="a" d="M60 420C20 470 70 520 30 570" />
      </svg>
      <main className="float">
        <div className="sheet">
          <nav role="tablist" aria-label="Seções">
            {ABAS.map((nome, i) => (
              <button key={nome} role="tab" aria-selected={aba === i} onClick={() => setAba(i)}>{nome}</button>
            ))}
          </nav>
          <div className="panels">
            {TELAS.map((T, i) => (
              <section key={i} className={'panel' + (aba === i ? ' on' : '')} role="tabpanel" aria-hidden={aba !== i}>
                <T />
              </section>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
