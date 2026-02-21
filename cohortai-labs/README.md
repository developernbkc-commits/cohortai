# CohortAI Labs — Premium Netlify Website (Pearl / Light Theme)

Built with **React + TypeScript + Vite + Tailwind + Framer Motion**.

## Run
```bash
npm install
npm run dev
```

## Deploy (Netlify)
- Build command: `npm run build`
- Publish directory: `dist`

## Logo + Images (no redeploy workflow)
Configured in `src/lib/site.ts`:
- `logoUrl`: https://github.com/developernbkc-commits/cohortai_labs_images/blob/main/cohortai_labs_logo.png?raw=true
- `imageBaseUrl`: https://raw.githubusercontent.com/developernbkc-commits/cohortai_labs_images/main/

Upload these files to your images repo (same names), and the live site will automatically show them:
- hero_lab_classroom_01.jpg
- hero_hybrid_learning_01.jpg
- track_everyday_ai_01.jpg
- track_business_ai_01.jpg
- track_tech_data_ai_01.jpg
- pricing_ladder_3d_cards_01.jpg
- mentor_profile_01.jpg, mentor_profile_02.jpg, mentor_profile_03.jpg
- learner_avatar_01.jpg, learner_avatar_02.jpg, learner_avatar_03.jpg
- gallery_class_01.jpg, gallery_class_02.jpg, gallery_online_01.jpg, gallery_projects_01.jpg

Note: after replacing an image, you may need a hard refresh due to browser caching.
