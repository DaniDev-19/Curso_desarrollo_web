const AcaCode = [
    {   
        id: 1,
        title:"AcaCode Academy",
        description: "AcaCode Academy Enfocada en la Guía del Entorno Tecnológico y Tecnologías emergentes. Cuenta con Profesionales Capacitados para la Fomentación y capacitación por diversas ramas a traves de cursos, especialades. Contando asi con las instalaciones adecuadas dando asi una adecuada facilidad a sus cursantes. Todos los cursos son avalados en donde a traves de ellos puedes conseguir certificados que sumen un gran peso, complementando tu conocimiento para ayudarte a crecer y ser mejor profesional",
        sedes: [
            {
                id: 1,
                ubicacion: "San Felipe",
            },
            {
                id: 2,
                ubicacion: "Independencia",
            },  
        ],
        tutores: [
            {
                id: 1,
                name: "Jesus Daniel Perdomo Ramirez", 
                curso: "Fundamentos de Programación & Desarrollo Web Cloud - On-Premise", 
            },
            {
                id: 2,
                name:"Jenniref Paiva",
                curso: "Big Data - Bases de Datos Relacionales - No Relacionales"
            }
        ],
    }
];



AcaCode.map(i => console.log(i));

const info = AcaCode[0];

document.getElementById("title").textContent = info.title;
document.getElementById("description").textContent = info.description;
document.getElementById("sedes").textContent = info.sedes.map(sede => sede.ubicacion).join(",  ");
document.getElementById("name_tutor").textContent = info.tutores.map(tutores => `${tutores.name} - (${tutores.curso})`).join("  || ");

// function Request () {
//     fetch(AcaCode){
//     return rows.json;
// };
// }