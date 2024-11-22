import { CVData } from "@/types/cv";

export function generateCVHtml(data: CVData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 40px;
          }
          h1 {
            color: #2c3e50;
            border-bottom: 2px solid #2c3e50;
            margin-bottom: 5px;
          }
          .job-title {
            color: #4a5568;
            font-size: 1.2em;
            margin-bottom: 20px;
          }
          .section {
            margin-bottom: 20px;
          }
          .section-title {
            color: #34495e;
            margin-bottom: 10px;
          }
          .bio {
            font-style: italic;
            color: #555;
            margin: 20px 0;
            line-height: 1.6;
          }
          .education-location {
            color: #666;
            font-style: italic;
          }
        </style>
      </head>
      <body>
        <h1>${data.personalInfo.fullName || ''}</h1>
        ${data.personalInfo.jobTitle ? `<div class="job-title">${data.personalInfo.jobTitle}</div>` : ''}
        
        <div class="section">
          ${data.personalInfo.email || data.personalInfo.phone ? 
            `<p>${[data.personalInfo.email, data.personalInfo.phone].filter(Boolean).join(' | ')}</p>` 
            : ''}
          ${data.personalInfo.address ? `<p>${data.personalInfo.address}</p>` : ''}
        </div>

        ${data.bio ? `<div class="bio">${data.bio}</div>` : ''}

        ${data.education.length > 0 ? `
          <div class="section">
            <h2 class="section-title">Education</h2>
            ${data.education
              .map(
                (edu) => `
              <div>
                <h3>${edu.school || ''}</h3>
                ${edu.location ? `<p class="education-location">${edu.location}</p>` : ''}
                ${edu.degree || edu.year ? 
                  `<p>${[edu.degree, edu.year].filter(Boolean).join(' - ')}</p>` 
                  : ''}
                ${edu.description ? `<p>${edu.description}</p>` : ''}
              </div>
            `
              )
              .join('')}
          </div>
        ` : ''}

        ${data.experience.length > 0 ? `
          <div class="section">
            <h2 class="section-title">Experience</h2>
            ${data.experience
              .map(
                (exp) => `
              <div>
                <h3>${exp.company || ''}</h3>
                ${exp.position ? `
                  <p>
                    <strong>${exp.position}</strong>
                    ${exp.workType || exp.locationType ? `
                      <span class="work-details">
                        (${[exp.workType, exp.locationType].filter(Boolean).join(' • ')})
                      </span>
                    ` : ''}
                  </p>
                ` : ''}
                ${exp.location ? `<p class="location"><em>${exp.location}</em></p>` : ''}
                ${exp.period ? `<p><em>${exp.period}</em></p>` : ''}
                ${exp.description ? `<p>${exp.description}</p>` : ''}
              </div>
            `
              )
              .join('')}
          </div>
        ` : ''}

        ${data.languages.length > 0 ? `
          <div class="section">
            <h2 class="section-title">Languages</h2>
            ${data.languages
              .map(
                (lang) => `
              ${lang.name || lang.proficiency ? `
                <div class="language-item">
                  ${lang.name ? `<span class="language-name">${lang.name}</span>` : ''}
                  ${lang.proficiency ? `<span class="language-proficiency">(${lang.proficiency})</span>` : ''}
                </div>
              ` : ''}
            `
              )
              .join('')}
          </div>
        ` : ''}

        ${data.skills.length > 0 ? `
          <div class="section">
            <h2 class="section-title">Skills</h2>
            <p>${data.skills.filter(Boolean).join(', ')}</p>
          </div>
        ` : ''}
      </body>
    </html>
  `;
}
