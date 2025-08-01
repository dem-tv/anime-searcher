import { NavLink } from 'react-router';

export function About() {
  return (
    <div
      className={
        'p-6 flex flex-col center dark:bg-neutral-900 dark:text-gray-300 min-h-dvh'
      }
    >
      <h1 className={'mb-4 font-bold text-4xl text-pink-400'}>
        Demchuk Tatuana
      </h1>
      <h2 className={'mb-2'}>About me:</h2>
      <ul className={'mb-2'}>
        <li>Super puper frontend developer</li>
        <li>Able to sit 10 times on one leg</li>
        <li>
          <a
            target="_blank"
            className={'text-blue-400'}
            href="https://github.com/dem-tv"
            rel="noreferrer"
          >
            github
          </a>
        </li>
      </ul>
      <h2 className={'mb-2'}>About project</h2>
      <ul className={'mb-2'}>
        <li>
          Used technologies: React, Tilewind,{' '}
          <a
            target="_blank"
            className={'text-blue-400'}
            href="https://docs.anilist.co/"
            rel="noreferrer"
          >
            anilist API
          </a>
        </li>
      </ul>
      <h2 className={'mb-2'}>Useful links for those who watch it:</h2>
      <ul className={'mb-2'}>
        <li>
          <a
            target="_blank"
            className={'text-yellow-500'}
            href="https://rs.school"
            rel="noreferrer"
          >
            RSSchool
          </a>
        </li>
      </ul>
      <NavLink
        className={'mt-2.5 text-pink-400 font-bold underline w-fit'}
        to={'/'}
      >
        Back
      </NavLink>
    </div>
  );
}
