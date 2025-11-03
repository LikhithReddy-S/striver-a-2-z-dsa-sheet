import React, { useState, useEffect } from 'react';
import './App.css';
import data from './completeData'; 
const PlatformIcon = ({ p }) => {
  const iconMap = {
    BLOG: 'blog.png',
    ALT: 'alt.png',
    YT: 'yt.png',
    LC: 'lc.svg',
    GFG: 'gfg.png',
    CN: 'cn.png',
    TUF: 'tuf.png',
  };

  const iconFile = iconMap[p];
  if (!iconFile) return null;

  return (
    <img
      src={`/icons/${iconFile}`}
      alt={p}
      className={`pi ${p.toLowerCase()}`}
      width="16"
      height="16"
    />
  );
};

/* -------------------------------------------------
   Topic table row – blank / dash when no link
------------------------------------------------- */
const TopicRow = ({ topic, done, toggle }) => {
  const handle = () => toggle(topic.id, !done);

  // Helper: render a cell – returns null (blank) or a dash + icon
  const Cell = ({ platform }) => {
    const url = topic.links[platform];
    if (!url) {
      return <span className="no-link">–</span>;
    }
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`l ${platform.toLowerCase()}`}
        title={platform}
      >
        <PlatformIcon p={platform} />
      </a>
    );
  };

  return (
    <tr className="tr">
      <td className="tt">
        <span>{topic.title}</span>
      </td>

      <td className="tl-cell"><Cell platform="BLOG" /></td>
      <td className="tl-cell"><Cell platform="ALT" /></td>
      <td className="tl-cell"><Cell platform="YT" /></td>
      <td className="tl-cell"><Cell platform="LC" /></td>
      <td className="tl-cell"><Cell platform="GFG" /></td>
      <td className="tl-cell"><Cell platform="CN" /></td>
      <td className="tl-cell"><Cell platform="TUF" /></td>

      <td className="done-cell">
        <input type="checkbox" checked={done} onChange={handle} className="cb" />
      </td>
    </tr>
  );
};

/* -------------------------------------------------
   Sub-step (table view)
------------------------------------------------- */
const SubStep = ({ sub, stepId, prog, update }) => {
  const [open, setOpen] = useState(false);
  const total = sub.topics.length;
  const done = sub.topics.filter(t => prog[t.id]).length;

  return (
    <div className="ss">
      <div className="ssh" onClick={() => setOpen(!open)}>
        <span className="sst">{sub.title}</span>
        <div className="sp">
          <span>{done}/{total}</span>
          <span className="si">{open ? '−' : '+'}</span>
        </div>
      </div>

      {open && (
        <div className="ssc">
          <table className="topic-table">
            <thead>
              <tr>
                <th>Topic</th>
                <th>BLOG</th>
                <th>ALT</th>
                <th>YT</th>
                <th>LC</th>
                <th>GFG</th>
                <th>CN</th>
                <th>TUF</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>
              {sub.topics.map(t => (
                <TopicRow
                  key={t.id}
                  topic={t}
                  done={!!prog[t.id]}
                  toggle={(id, v) => update(stepId, sub.number, id, v)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------
   Step
------------------------------------------------- */
const Step = ({ step, globalProg, updateGlobal }) => {
  const [open, setOpen] = useState(false);
  const prog = globalProg[step.number] ?? {};

  const total = step.subSteps.reduce((a, s) => a + s.topics.length, 0);
  const done = Object.values(prog).reduce(
    (a, sub) => a + Object.values(sub).filter(Boolean).length,
    0
  );

  return (
    <div className={`st ${open ? 'open' : ''}`}>
      <div className="sth" onClick={() => setOpen(!open)}>
        <span className="stt">{step.title}</span>
        <div className="sp">
          <span>{done}/{total}</span>
          <span className="si">{open ? '−' : '+'}</span>
        </div>
      </div>

      {open && (
        <div className="stc">
          {step.subSteps.map(sub => (
            <SubStep
              key={sub.number}
              sub={sub}
              stepId={step.number}
              prog={prog[sub.number] ?? {}}
              update={updateGlobal}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------
   App – localStorage + table UI + Dark Mode Toggle
------------------------------------------------- */
const STORAGE_KEY = 'dsa-a2z-progress';
const THEME_KEY = 'dsa-theme';

const App = () => {
  const [steps] = useState(data);
  const [progress, setProgress] = useState({});
  const [theme, setTheme] = useState('dark');

  // load from localStorage
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setProgress(JSON.parse(raw));

    const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  // save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  // toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.body.className = newTheme;
    localStorage.setItem(THEME_KEY, newTheme);
  };

  // toggle a single topic
  const toggle = (stepId, subId, topicId, val) => {
    setProgress(p => {
      const step = { ...(p[stepId] ?? {}) };
      const sub = { ...(step[subId] ?? {}) };
      sub[topicId] = val;
      step[subId] = sub;
      return { ...p, [stepId]: step };
    });
  };

  return (
    <div className="app">
      <header className="hdr">
        <h1>Striver’s A2Z DSA Sheet</h1>
        <p>Master DSA – one topic at a time</p>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </header>

      <main className="main">
        {steps.map(s => (
          <Step
            key={s.number}
            step={s}
            globalProg={progress}
            updateGlobal={toggle}
          />
        ))}
      </main>

      <footer className="ftr">Made with ❣️ for DSA Learners</footer>
    </div>
  );
};

export default App;