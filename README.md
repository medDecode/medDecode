# MedDecode

## Project Description
**MedDecode** is an online service that helps users quickly decipher the results of medical tests.
The user can enter their indicators (for example, hemoglobin, glucose, cholesterol, etc.), after which the system
will automatically compare them with the norms, determine deviations (below/above the norm) and display the result in a convenient form.
Additionally, the service provides recommendations on which specialist to contact based on the test results.

---

## Project Structure
medDecode/                      
│                                   
├── css/                         
│   ├── base.css                  
│   ├── style.css                       
│   ├── components.css                        
│   ├── cross-browser.css                   
│   ├── grid-layout.css                        
│   └── layout.css                      
│                                                 
├── images/                          
│                                              
├── js/                                              
│   └── script.js                                                 
│                                                           
├── index.html                                                   
├── decoding.html                                           
├── specialists.html                                       
├── service.html                                                   
├── contacts.html                                      
│                                                  
└── README.md                                             


---

## CSS Architecture
- Modular structure: `base.css`, `layout.css`, `components.css`, `grid-layout.css`, `style.css`, `cross-browser.css`  
- CSS Grid for complex layouts (specialist grids, cards, dashboard)  
- Flexbox for alignment and distribution of elements  
- CSS Custom Properties (variables for colors, spacing, radii)  

---

## Responsive Design
- Mobile-first approach  
- Media queries for different breakpoints:
  - 768px — tablets  
  - 480px — mobile devices  
  - 360px — small phones  
- Viewport units for flexible sizing  

---

## Modern CSS Features
- CSS Grid for complex layouts  
- Flexbox for components  
- CSS Variables for design systems  
- Backdrop-filter for glass effect  
- Transform/Transition for animations  

---

## Optimization
- Efficient selectors  
- Minimal use of `!important`  
- Optimized media queries  
- Correct order of CSS rules  

---

## Browser Support
- Cross-browser compatibility  
- Specific fixes for Safari  
- Touch-friendly interface for mobile devices  
- Print styles for optimized printing  

---

## JavaScript Architecture
`main.js` includes the following features:

### DOM Manipulation
- Change element styles by class  
- Add new elements to `<main>`  

### Dynamic Content
- Show current date in the footer  
- "Show more" button for accordion  

### Events and Handlers
- Change site theme via button (toggle `dark-theme` class)  
- Highlight navigation menu on mouseover  
- Change font size using ArrowUp / ArrowDown keys  

### Forms and Validation
- Prevent default form submission  
- Read data from form fields  
- Client-side validation:
  - Name: at least 3 characters  
  - Email: must contain `@` and domain  
  - Message: at least 10 characters  
- Highlight errors and display success message  

### LocalStorage (Bonus)
- Save selected site theme (dark / light)  
- Save username or dynamic elements  

---

## Performers
- **Perevoznyk Viktoriia** — developer of site structure, design, main functionality, layout, testing  
- **Lyashenko Oleksandra** — developer of site structure, design, main functionality, layout, testing  
