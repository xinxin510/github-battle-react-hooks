import React from 'react';

export default function LanguagesNav({selectedLanguage, updateLanguage}) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
    <ul className='flex-center'>
      {languages.map(language =>
        <li key={language}>
          <button
            className='btn-clear nav-link'
            onClick={() => updateLanguage(language)}
            style={{color: language === selectedLanguage ? 'rgb(187, 46, 31)' : 'inherit'}}
          >
            {language}
          </button>
        </li>
      )}
    </ul>
  )
}