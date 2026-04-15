// Resources page component - Career resources and opportunities for persons with disabilities
export function renderResources() {
    return `
        <main role="main" aria-labelledby="resources-heading">
            <div class="container" style="padding: 2rem 20px; max-width: 1200px;">
                <div style="margin-bottom: 3rem; text-align: center;">
                    <h1 id="resources-heading" style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--primary-color);">📚 Career Resources & Opportunities</h1>
                    <p style="font-size: 1.1rem; color: var(--text-secondary); max-width: 600px; margin: 0 auto;">
                        Explore comprehensive resources for job opportunities, training, and career support tailored for persons with disabilities
                    </p>
                </div>

                <!-- Indian Job Portals Section -->
                <section aria-labelledby="india-jobs-heading" style="margin-bottom: 3rem;">
                    <h2 id="india-jobs-heading" style="font-size: 1.8rem; margin-bottom: 1.5rem; color: var(--accent-primary); display: flex; align-items: center; gap: 0.5rem;">
                        🇮🇳 Indian Disability Job Portals
                    </h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                        ${renderResourceCard(
                            'SwarajAbility — Inclusive Jobs Portal',
                            'Major AI-powered job portal for persons with disabilities in India with accessible job listings and placement support.',
                            'https://www.swarajability.org/',
                            '💼 Job Portal'
                        )}
                        ${renderResourceCard(
                            'Divyang Career (India)',
                            'User-friendly job portal for disabled job seekers and inclusive employers.',
                            'https://divyangcareer.com/',
                            '💼 Job Portal'
                        )}
                        ${renderResourceCard(
                            'Youth4Jobs — PwD Employment',
                            'Not just a job board: offers training, skilling, and placement support across India.',
                            'https://youth4jobs.org/',
                            '🎓 Training & Jobs'
                        )}
                        ${renderResourceCard(
                            'RozgarSarathi (Sarthak Educational Trust)',
                            'Job portal with inclusive listings and career opportunities for PwDs.',
                            'https://sarthakindia.org/',
                            '💼 Job Portal'
                        )}
                        ${renderResourceCard(
                            'Atypical Advantage – Find a Job',
                            'Inclusive livelihood and employment platform connecting disabled professionals with companies.',
                            'https://atypicaladvantage.in/find-a-job',
                            '🤝 Employment Platform'
                        )}
                    </div>
                </section>

                <!-- Global Job Portals Section -->
                <section aria-labelledby="global-jobs-heading" style="margin-bottom: 3rem;">
                    <h2 id="global-jobs-heading" style="font-size: 1.8rem; margin-bottom: 1.5rem; color: var(--accent-primary); display: flex; align-items: center; gap: 0.5rem;">
                        🌐 Global Disability Job Boards
                    </h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                        ${renderResourceCard(
                            'abilityJOBS — Disabilities Employment Board',
                            'Job board where employers specifically seeking to hire people with disabilities post positions.',
                            'https://abilityjobs.com/',
                            '🌍 Global Job Board'
                        )}
                        ${renderResourceCard(
                            'DisabledPerson.com — Inclusive Job Listings',
                            'Global portal focused on accessible job listings and career postings for people with disabilities.',
                            'https://www.disabledperson.com/',
                            '🌍 Global Job Board'
                        )}
                    </div>
                </section>

                <!-- Government & Public Resources Section -->
                <section aria-labelledby="govt-heading" style="margin-bottom: 3rem;">
                    <h2 id="govt-heading" style="font-size: 1.8rem; margin-bottom: 1.5rem; color: var(--accent-primary); display: flex; align-items: center; gap: 0.5rem;">
                        🏛️ Government & Public Career Resources (India)
                    </h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                        ${renderResourceCard(
                            'Department of Empowerment of Persons with Disabilities (DEPwD)',
                            'Official govt employment and vacancy circulars for differently-abled persons.',
                            'https://depwd.gov.in/en/career/',
                            '🏢 Government'
                        )}
                        ${renderResourceCard(
                            'National Career Service Centres for Differently Abled',
                            'Career guidance, placement support, vocational training and outreach services.',
                            'https://dge.gov.in/dge/ncsc_da',
                            '🏢 Government'
                        )}
                        ${renderResourceCard(
                            'NIEPMD — Regional Recruitment Opportunities',
                            'State-level recruitment opportunities for persons with disabilities.',
                            'https://niepmd.nic.in/notice-category/dail_vacancy/',
                            '🏢 Government'
                        )}
                        ${renderResourceCard(
                            'Karmayog — Disabled Jobs',
                            'Filtered job listings for disabled candidates in India.',
                            'https://karmayog.org/jobs-needed-by-disabled/',
                            '💼 Job Board'
                        )}
                    </div>
                </section>

                <!-- Major Employers Section -->
                <section aria-labelledby="employers-heading" style="margin-bottom: 3rem;">
                    <h2 id="employers-heading" style="font-size: 1.8rem; margin-bottom: 1.5rem; color: var(--accent-primary); display: flex; align-items: center; gap: 0.5rem;">
                        💼 Inclusive Hiring by Major Employers
                    </h2>
                    <div style="background: var(--bg-tertiary); border-left: 4px solid var(--primary-color); padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem;">
                        <p style="margin-bottom: 1rem;">These companies have dedicated inclusive hiring and accommodations:</p>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                        ${renderResourceCard(
                            'Amazon India – People with Disabilities Careers',
                            'Information on inclusive hiring policies and accommodations at Amazon.',
                            'https://jobs.amazon.in/people-with-disabilities',
                            '🏢 Major Employer'
                        )}
                        ${renderResourceCard(
                            'Oracle India – Disability Inclusion Careers',
                            'Insight into Oracle\'s inclusive workplace and career opportunities for PWDs.',
                            'https://www.oracle.com/in/careers/culture-inclusion/disability-inclusion/',
                            '🏢 Major Employer'
                        )}
                    </div>
                    <div style="background: var(--bg-tertiary); padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem;">
                        <p style="color: var(--text-secondary);">
                            <strong>💡 Tip:</strong> Many large employers (Tata, Infosys, Wipro, Accenture, etc.) also have inclusive hiring policies — search their careers pages with keywords like "disability inclusion".
                        </p>
                    </div>
                </section>

                <!-- Training & Skill Development Section -->
                <section aria-labelledby="training-heading" style="margin-bottom: 3rem;">
                    <h2 id="training-heading" style="font-size: 1.8rem; margin-bottom: 1.5rem; color: var(--accent-primary); display: flex; align-items: center; gap: 0.5rem;">
                        📚 Training, Skill Development & Career Support
                    </h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                        ${renderResourceCard(
                            'Sarthak Educational Trust – Skill & Career Programs',
                            'Offers skilling, vocational training, e-learning, and job placement services.',
                            'https://sarthakindia.org/',
                            '🎓 Training'
                        )}
                        ${renderResourceCard(
                            'Skill Council for Persons with Disability (SCPwD)',
                            'Industry-aligned skill training and job roles relevant for persons with disabilities.',
                            'https://scpwd.in/Job-role.php',
                            '🎓 Training'
                        )}
                        ${renderResourceCard(
                            'Enable India – Jobs & Training for PwDs',
                            'Training, job mapping, self-employment support, and employer inclusion.',
                            'https://www.enableindia.org/',
                            '🎓 Training & Support'
                        )}
                    </div>
                </section>

                <!-- Support Organizations Section -->
                <section aria-labelledby="support-heading" style="margin-bottom: 3rem;">
                    <h2 id="support-heading" style="font-size: 1.8rem; margin-bottom: 1.5rem; color: var(--accent-primary); display: flex; align-items: center; gap: 0.5rem;">
                        🤝 Support Organizations & NGOs (Career & Empowerment)
                    </h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                        ${renderResourceCard(
                            'National Centre for Promotion of Employment for Disabled People',
                            'Works to increase employment opportunities and disability inclusion.',
                            'https://ncpedp.org/',
                            '🤝 NGO'
                        )}
                        ${renderResourceCard(
                            'Samarthanam Trust for the Disabled',
                            'Provides education, vocational training, and employment support.',
                            'https://samarthanam.org/',
                            '🤝 NGO'
                        )}
                        ${renderResourceCard(
                            'Association of People with Disability (APD)',
                            'Supports inclusive workplaces and often lists internal job opportunities.',
                            'https://www.apd-india.org/',
                            '🤝 NGO'
                        )}
                        ${renderResourceCard(
                            'Deaf Enabled Foundation (DEF)',
                            'Skill training, sign language education, and placements for deaf people.',
                            'https://def.org.in/',
                            '🤝 NGO - Deaf Inclusion'
                        )}
                        ${renderResourceCard(
                            'Tamana Trust',
                            'Supports education, training, and career transition for intellectually/developmentally disabled individuals.',
                            'https://tamana.ngo/',
                            '🤝 NGO'
                        )}
                        ${renderResourceCard(
                            'V-Shesh',
                            'Supports employment facilitation, workplace inclusion, and recruitment support for PwDs.',
                            'https://v-shesh.com/',
                            '🤝 Employment Support'
                        )}
                        ${renderResourceCard(
                            'InclusiveTech India',
                            'Curated list of portals and job opportunities oriented to persons with disabilities.',
                            'https://www.inclusivetechindia.in/jobs',
                            '🤝 Resource Portal'
                        )}
                    </div>
                </section>

                <!-- Additional Support Systems Section -->
                <section aria-labelledby="additional-heading" style="margin-bottom: 3rem;">
                    <h2 id="additional-heading" style="font-size: 1.8rem; margin-bottom: 1.5rem; color: var(--accent-primary); display: flex; align-items: center; gap: 0.5rem;">
                        📈 Additional Support Systems
                    </h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                        ${renderResourceCard(
                            'Accessible India Campaign',
                            'A national initiative to improve accessibility and support inclusive employment.',
                            'https://accessibleindia.gov.in/',
                            '🏛️ Government Initiative'
                        )}
                        ${renderResourceCard(
                            'EmpowerAbility (Research Portal)',
                            'Research-oriented portal looking at employment + scholarships for PwDs. Great for insights and understanding.',
                            'https://arxiv.org/abs/2403.11769',
                            '📊 Research'
                        )}
                    </div>
                </section>

                <!-- Call to Action -->
                <section style="background: linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(56, 142, 60, 0.1) 100%); padding: 2rem; border-radius: 8px; text-align: center;">
                    <h2 style="margin-bottom: 1rem; color: var(--accent-primary);">Ready to Explore Your Career Path?</h2>
                    <p style="margin-bottom: 1.5rem; font-size: 1.1rem; color: var(--text-secondary);">
                        Use these resources to find opportunities, develop skills, and connect with inclusive employers.
                    </p>
                    <a href="#/assessment" class="btn btn-primary" role="button" aria-label="Take career assessment">
                        Take Your Assessment
                    </a>
                </section>
            </div>
        </main>
    `;
}

// Helper function to render individual resource cards
function renderResourceCard(title, description, url, badge) {
    return `
        <div class="card" style="display: flex; flex-direction: column; height: 100%; transition: all 0.3s ease; border: 1px solid var(--bg-tertiary); hover-shadow: 0 4px 12px rgba(0,0,0,0.15);">
            <div style="padding: 1.5rem; display: flex; flex-direction: column; height: 100%;">
                <div style="margin-bottom: 1rem;">
                    <span class="badge" style="display: inline-block; background: var(--primary-color); color: white; padding: 0.4rem 0.8rem; border-radius: 20px; font-size: 0.85rem; margin-bottom: 0.5rem;">
                        ${badge}
                    </span>
                </div>
                <h3 style="margin-bottom: 0.75rem; color: var(--primary-color); font-size: 1.1rem; line-height: 1.3;">
                    ${title}
                </h3>
                <p style="margin-bottom: 1.5rem; color: var(--text-secondary); font-size: 0.95rem; line-height: 1.5; flex-grow: 1;">
                    ${description}
                </p>
                <a href="${url}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-primary" style="align-self: flex-start;">
                    Visit Website <span style="margin-left: 0.5rem;">→</span>
                </a>
            </div>
        </div>
    `;
}
