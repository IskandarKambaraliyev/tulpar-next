const bcrypt = require("bcrypt");
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const services = [
    {
      slug: "cardiology-consultation",
      title: "Cardiology Consultation",
      description:
        "Comprehensive consultation and diagnosis for heart-related conditions.",
      image: "/images/services/",
      additional_image: "/images/services/",
      content: `
        <p>Our cardiology consultation service provides a detailed assessment of heart-related health concerns. We utilize advanced diagnostic equipment to identify potential issues and develop personalized treatment plans tailored to each patient's needs.</p>
        <ul>
          <li>ECG and Echocardiography services available.</li>
          <li>In-depth risk assessment for cardiovascular diseases.</li>
          <li>Recommendations for lifestyle and dietary changes.</li>
        </ul>
      `,
      priceList: {
        create: [
          { name: "Initial Consultation", price: "3000/hour", order: 0 },
          { name: "Follow-up Consultation", price: "2000/hour", order: 1 },
          { name: "ECG Test", price: "1500/test", order: 2 },
        ],
      },
      order: 0,
      createdAt: new Date(),
    },
    {
      slug: "rehabilitation-program",
      title: "Cardiac Rehabilitation Program",
      description:
        "Tailored rehabilitation programs for patients recovering from heart surgery or cardiovascular conditions.",
      image: "/images/services/",
      additional_image: "/images/services/",
      content: `
        <p>Our cardiac rehabilitation program focuses on helping patients regain strength and improve their overall health following heart surgery or cardiovascular incidents. The program combines supervised exercise, education, and emotional support.</p>
        <ul>
          <li>Customized exercise plans for gradual recovery.</li>
          <li>Health monitoring and regular progress evaluations.</li>
          <li>Counseling sessions to manage stress and anxiety.</li>
        </ul>
      `,
      priceList: {
        create: [
          { name: "Weekly Program", price: "5000/week", order: 3 },
          { name: "Monthly Program", price: "18000/month", order: 4 },
        ],
      },
      order: 1,
      createdAt: new Date(),
    },
    {
      slug: "diagnostic-services",
      title: "Advanced Diagnostic Services",
      description:
        "State-of-the-art diagnostic services for early detection and treatment planning.",
      image: "/images/services/",
      additional_image: null,
      content: `
        <p>Our advanced diagnostic services offer accurate and timely detection of cardiovascular and related conditions. We use cutting-edge technology to ensure reliable results.</p>
        <ul>
          <li>CT Scans and MRIs for detailed imaging.</li>
          <li>Blood tests to assess heart health markers.</li>
          <li>Stress tests to evaluate cardiovascular function.</li>
        </ul>
      `,
      priceList: {
        create: [
          { name: "CT Scan", price: "7000/scan", order: 5 },
          { name: "MRI", price: "12000/scan", order: 6 },
          { name: "Stress Test", price: "4000/test", order: 7 },
        ],
      },
      order: 2,
      createdAt: new Date(),
    },
    {
      slug: "nutrition-counseling",
      title: "Nutrition Counseling for Heart Health",
      description:
        "Professional dietary advice to support heart health and recovery.",
      image: "/images/services/",
      additional_image: "/images/services/",
      content: `
        <p>Proper nutrition is a cornerstone of heart health. Our expert nutritionists provide personalized dietary advice to support recovery and prevent further cardiovascular issues.</p>
        <ul>
          <li>Customized meal plans for heart-healthy diets.</li>
          <li>Education on foods to avoid and include.</li>
          <li>Support for weight management and cholesterol control.</li>
        </ul>
      `,
      priceList: {
        create: [
          { name: "Initial Consultation", price: "2000/hour", order: 8 },
          { name: "Follow-up Session", price: "1500/hour", order: 9 },
        ],
      },
      order: 3,
      createdAt: new Date(),
    },
    {
      slug: "dermatology-consultation",
      title: "Dermatology Consultation",
      description:
        "Comprehensive consultation and treatment plans for skin conditions.",
      image: "/images/services/",
      additional_image: "/images/services/",
      content: `
        <p>Our dermatology consultation service offers expert evaluation and treatment recommendations for various skin conditions. We combine medical expertise with advanced technology to deliver optimal care.</p>
        <ul>
          <li>Diagnosis and management of skin disorders.</li>
          <li>Customized treatment plans for acne, eczema, psoriasis, etc.</li>
          <li>Recommendations for skincare products and routines.</li>
        </ul>
      `,
      priceList: {
        create: [
          { name: "Initial Consultation", price: "2500/hour", order: 10 },
          { name: "Follow-up Consultation", price: "1500/hour", order: 11 },
          { name: "Skin Biopsy", price: "2000/test", order: 12 },
        ],
      },
      order: 4,
      createdAt: new Date(),
    },
    {
      slug: "laser-therapy",
      title: "Laser Therapy for Skin Conditions",
      description:
        "Advanced laser treatments for acne scars, pigmentation, and skin rejuvenation.",
      image: "/images/services/",
      additional_image: "/images/services/",
      content: `
        <p>Our laser therapy services utilize cutting-edge technology to address a variety of skin concerns, including acne scars, pigmentation issues, and signs of aging. The treatments are safe, effective, and tailored to individual needs.</p>
        <ul>
          <li>Laser resurfacing for smoother, more even skin tone.</li>
          <li>Scar reduction and collagen stimulation.</li>
          <li>Non-invasive skin rejuvenation procedures.</li>
        </ul>
      `,
      priceList: {
        create: [
          { name: "Laser Treatment", price: "3000/session", order: 13 },
          { name: "Package of 5 Sessions", price: "12000/package", order: 14 },
        ],
      },
      order: 5,
      createdAt: new Date(),
    },
    {
      slug: "botox-injections",
      title: "Botox Injections for Wrinkle Reduction",
      description:
        "Cosmetic botox treatments to reduce fine lines and wrinkles.",
      image: "/images/services/",
      additional_image: null,
      content: `
        <p>Our botox injection services offer a safe and effective solution for reducing fine lines and wrinkles, resulting in smoother, younger-looking skin. Our experienced professionals ensure natural-looking results with minimal downtime.</p>
        <ul>
          <li>Targeted treatment for crow's feet, forehead lines, and more.</li>
          <li>Quick
          procedure with no anesthesia required.</li>
          <li>Results visible within a few days.</li>
        </ul>
      `,
      priceList: {
        create: [
          { name: "Botox Injection", price: "5000/session", order: 15 },
          { name: "Package of 3 Sessions", price: "12000/package", order: 16 },
        ],
      },
      order: 6,
      createdAt: new Date(),
    },
  ];

  for (const service of services) {
    await prisma.service.create({
      data: {
        ...service,
        priceList: {
          connectOrCreate: service.priceList.create.map((price) => ({
            where: { name: price.name },
            create: {
              name: price.name,
              price: price.price,
              order: price.order,
            },
          })),
        },
      },
    });
  }

  const specialists = [
    {
      slug: "dr-john-doe",
      name: "Dr. John Doe",
      image: "/images/specialists/",
      job_title: "Cardiologist",
      specialty:
        "Specializes in diagnosing and treating heart diseases, with expertise in minimally invasive cardiac procedures and preventive cardiology.",
      career: `<p>Dr. John Doe has over two decades of experience in the field of cardiology, working in some of the most reputed hospitals in the country. He earned his medical degree from Harvard Medical School, followed by a residency at the Johns Hopkins Hospital. Over the years, Dr. Doe has been instrumental in developing innovative techniques for diagnosing and treating cardiovascular diseases, particularly focusing on patient-centric care.</p>
      <ul>
        <li>20+ years in clinical cardiology practice.</li>
        <li>Conducted over 5,000 minimally invasive procedures.</li>
        <li>Published 30+ research papers in renowned medical journals.</li>
        <li>Serves as a guest lecturer at international cardiology conferences.</li>
      </ul>`,
      experience: `<p>Dr. Doe is known for his compassionate approach toward patients, ensuring that every individual receives personalized care tailored to their unique needs. His expertise spans across a wide range of cardiovascular treatments, including echocardiography, stress testing, and cardiac catheterization. He is particularly skilled in managing complex cases such as congenital heart defects and advanced heart failure.</p>
      <ul>
        <li>Specialist in preventive cardiology and patient education programs.</li>
        <li>Developed community outreach programs promoting heart health.</li>
        <li>Recipient of the "Excellence in Cardiology" award in 2021.</li>
      </ul>`,
      order: 0,
    },
    {
      slug: "dr-jane-smith",
      name: "Dr. Jane Smith",
      image: "/images/specialists/",
      job_title: "Dermatologist",
      specialty:
        "Expert in treating skin conditions, including acne, eczema, psoriasis, and cosmetic dermatology procedures like laser therapy and botox.",
      career: `<p>Dr. Jane Smith is a board-certified dermatologist with 15 years of experience in both medical and cosmetic dermatology. She graduated from Stanford University School of Medicine and completed her residency at the Mayo Clinic. Dr. Smith has dedicated her career to enhancing skin health and improving her patients’ confidence through advanced dermatological treatments.</p>
      <ul>
        <li>15 years of clinical dermatology experience.</li>
        <li>Pioneer in laser treatments for chronic skin conditions.</li>
        <li>Published 20+ articles on advancements in dermatology.</li>
        <li>Frequent speaker at global dermatology summits.</li>
      </ul>`,
      experience: `<p>Dr. Smith's practice combines her vast knowledge of skin conditions with state-of-the-art technology to provide top-notch care. Her commitment to patient satisfaction and education has earned her a loyal following. Whether it’s managing persistent conditions like rosacea or performing intricate cosmetic procedures, Dr. Smith ensures a seamless experience for her patients.</p>
      <ul>
        <li>Expert in non-invasive cosmetic procedures.</li>
        <li>Developed personalized treatment plans for over 10,000 patients.</li>
        <li>Awarded "Best Dermatologist" in the region for five consecutive years.</li>
      </ul>`,
      order: 1,
    },
    {
      slug: "dr-michael-jones",
      name: "Dr. Michael Jones",
      image: "/images/specialists/",
      job_title: "Nutritionist",
      specialty:
        "Specializes in creating personalized nutrition plans for heart health, weight management, and overall well-being.",
      career: `<p>Dr. Michael Jones is a registered dietitian and nutritionist with a focus on cardiovascular health and disease prevention. He holds a Ph.D. in Nutritional Sciences from the University of California, Berkeley, and has conducted extensive research on the impact of diet on heart health. Dr. Jones is passionate about empowering individuals to make informed choices about their nutrition and lead healthier lives.</p>
      <ul>
        <li>10+ years of experience in clinical nutrition.</li>
        <li>Published research on the role of diet in heart disease prevention.</li>
        <li>Developed nutrition education programs for schools and communities.</li>
        <li>Featured in national health magazines for his expertise.</li>
      </ul>`,
      experience: `<p>Dr. Jones takes a holistic approach to nutrition, considering each patient’s unique health goals and lifestyle factors. He provides evidence-based guidance on dietary changes that can improve heart health, manage weight, and enhance overall well-being. Dr. Jones is known for his practical advice and ongoing support to help patients achieve sustainable results.</p>
      <ul>
        <li>Specialist in plant-based diets for heart disease prevention.</li>
        <li>Conducted nutrition workshops for over 1,000 individuals.</li>
        <li>Hosts a popular podcast on nutrition and health topics.</li>
      </ul>`,
      order: 2,
    },
    {
      slug: "dr-emily-clark",
      name: "Dr. Emily Clark",
      image: "/images/specialists/",
      job_title: "Orthopedic Surgeon",
      specialty:
        "Expert in surgical and non-surgical treatment of musculoskeletal system disorders, including bones, joints, ligaments, tendons, and muscles.",
      career: `<p>Dr. Emily Clark is a highly skilled orthopedic surgeon with over 12 years of experience in treating a wide range of musculoskeletal conditions. She completed her medical degree at the University of California, San Francisco, and her residency at the Hospital for Special Surgery in New York. Dr. Clark is known for her expertise in minimally invasive surgical techniques and her commitment to patient-centered care.</p>
      <ul>
        <li>12+ years of experience in orthopedic surgery.</li>
        <li>Performed over 1,500 successful joint replacement surgeries.</li>
        <li>Published 25+ research papers on orthopedic advancements.</li>
        <li>Active member of the American Academy of Orthopedic Surgeons.</li>
      </ul>`,
      experience: `<p>Dr. Clark's practice focuses on providing comprehensive care for patients with orthopedic conditions. She is adept at diagnosing and treating a variety of issues, from sports injuries to degenerative diseases. Her approach combines advanced surgical techniques with personalized rehabilitation plans to ensure optimal recovery for her patients.</p>
      <ul>
        <li>Specialist in arthroscopic surgery and joint preservation.</li>
        <li>Developed innovative rehabilitation protocols for post-surgical recovery.</li>
        <li>Recipient of the "Outstanding Orthopedic Surgeon" award in 2020.</li>
      </ul>`,
      order: 3,
    },
    {
      slug: "dr-susan-lee",
      name: "Dr. Susan Lee",
      image: "/images/specialists/",
      job_title: "Pediatrician",
      specialty:
        "Specializes in the medical care of infants, children, and adolescents, with a focus on preventive health and developmental milestones.",
      career: `<p>Dr. Susan Lee is a dedicated pediatrician with over 15 years of experience in child healthcare. She graduated from Yale School of Medicine and completed her residency at Boston Children's Hospital. Dr. Lee is passionate about providing comprehensive care to children and supporting their families through every stage of development.</p>
      <ul>
      <li>15+ years of experience in pediatric care.</li>
      <li>Expert in childhood immunizations and preventive health.</li>
      <li>Published numerous articles on pediatric health and nutrition.</li>
      <li>Active member of the American Academy of Pediatrics.</li>
      </ul>`,
      experience: `<p>Dr. Lee's approach to pediatric care is centered around building strong relationships with her patients and their families. She emphasizes the importance of preventive care, early diagnosis, and personalized treatment plans to ensure the best outcomes for her young patients.</p>
      <ul>
      <li>Specialist in developmental assessments and early intervention.</li>
      <li>Conducted community health programs focused on child wellness.</li>
      <li>Recipient of the "Outstanding Pediatrician" award in 2019.</li>
      </ul>`,
      order: 4,
    },
    {
      slug: "dr-david-wilson",
      name: "Dr. David Wilson",
      image: "/images/specialists/",
      job_title: "Neurologist",
      specialty:
        "Expert in diagnosing and treating disorders of the nervous system, including epilepsy, multiple sclerosis, and neurodegenerative diseases.",
      career: `<p>Dr. David Wilson is a board-certified neurologist with over 20 years of experience in the field. He earned his medical degree from the University of Pennsylvania and completed his residency at the Cleveland Clinic. Dr. Wilson is known for his expertise in managing complex neurological conditions and his commitment to advancing neurological research.</p>
      <ul>
      <li>20+ years of experience in neurology.</li>
      <li>Specialist in epilepsy and neurodegenerative diseases.</li>
      <li>Published over 40 research papers in leading medical journals.</li>
      <li>Frequent speaker at international neurology conferences.</li>
      </ul>`,
      experience: `<p>Dr. Wilson's practice focuses on providing comprehensive care for patients with neurological disorders. He utilizes the latest diagnostic tools and treatment options to manage conditions such as epilepsy, multiple sclerosis, and Parkinson's disease. Dr. Wilson is dedicated to improving the quality of life for his patients through personalized care and ongoing support.</p>
      <ul>
      <li>Expert in advanced neuroimaging techniques.</li>
      <li>Developed patient education programs for neurological conditions.</li>
      <li>Recipient of the "Excellence in Neurology" award in 2022.</li>
      </ul>`,
      order: 5,
    },
    {
      slug: "dr-linda-brown",
      name: "Dr. Linda Brown",
      image: "/images/specialists/",
      job_title: "Endocrinologist",
      specialty:
        "Specializes in diagnosing and treating hormonal disorders, including diabetes, thyroid diseases, and metabolic disorders.",
      career: `<p>Dr. Linda Brown is a highly respected endocrinologist with over 18 years of experience in the field. She graduated from Johns Hopkins University School of Medicine and completed her residency at the Mayo Clinic. Dr. Brown is dedicated to providing comprehensive care for patients with endocrine disorders and is actively involved in clinical research.</p>
      <ul>
      <li>18+ years of experience in endocrinology.</li>
      <li>Expert in diabetes management and thyroid disorders.</li>
      <li>Published numerous articles on endocrine health and treatment.</li>
      <li>Member of the Endocrine Society and American Diabetes Association.</li>
      </ul>`,
      experience: `<p>Dr. Brown's approach to endocrine care is patient-centered, focusing on individualized treatment plans and ongoing education. She is committed to helping her patients achieve optimal health through effective management of hormonal disorders and lifestyle modifications.</p>
      <ul>
      <li>Specialist in insulin pump therapy and continuous glucose monitoring.</li>
      <li>Conducted community outreach programs on diabetes prevention.</li>
      <li>Recipient of the "Top Endocrinologist" award in 2021.</li>
      </ul>`,
      order: 6,
    },
  ];

  for (const specialist of specialists) {
    await prisma.specialists.create({
      data: {
        ...specialist,
      },
    });
  }

  const reports = [
    {
      title: "Annual Report 2021",
      src: "/images/reports/",
      is_video: false,
      order: 0,
      createdAt: new Date(),
    },
    {
      title: "Quarterly Report Q2 2021",
      src: "/images/reports/",
      is_video: false,
      order: 1,
      createdAt: new Date(),
    },
    {
      title: "Financial Report 2020",
      src: "/images/reports/",
      is_video: false,
      order: 2,
      createdAt: new Date(),
    },
    {
      title: "Company Overview Video",
      src: "/images/reports/",
      is_video: true,
      order: 3,
      createdAt: new Date(),
    },
    {
      title: "Annual Report 2022",
      src: "/images/reports/",
      is_video: false,
      order: 4,
      createdAt: new Date(),
    },
    {
      title: "Quarterly Report Q1 2022",
      src: "/images/reports/",
      is_video: false,
      order: 5,
      createdAt: new Date(),
    },
    {
      title: "Sustainability Report 2021",
      src: "/images/reports/",
      is_video: false,
      order: 6,
      createdAt: new Date(),
    },
    {
      title: "Employee Engagement Survey 2021",
      src: "/images/reports/",
      is_video: false,
      order: 7,
      createdAt: new Date(),
    },
    {
      title: "Market Analysis Report 2022",
      src: "/images/reports/",
      is_video: false,
      order: 8,
      createdAt: new Date(),
    },
    {
      title: "Product Launch Video",
      src: "/images/reports/",
      is_video: true,
      order: 9,
      createdAt: new Date(),
    },
  ];

  for (const report of reports) {
    await prisma.reports.create({
      data: {
        ...report,
      },
    });
  }

  const newsAndTips = [
    {
      slug: "heart-healthy-lifestyle-tips",
      title: "Top Tips for a Heart-Healthy Lifestyle",
      image: "/images/news/",
      description:
        "Discover actionable tips to maintain a heart-healthy lifestyle and prevent cardiovascular disease.",
      content: `
          <p>Living a heart-healthy lifestyle is one of the most important ways to reduce your risk of cardiovascular diseases. By adopting healthy habits and making smart choices, you can improve your heart health, enhance your overall well-being, and live a longer, more active life. Here are some key tips to help you on your journey to a healthier heart.</p>
          
          <h2>1. Maintain a Healthy Diet</h2>
          <p>One of the most effective ways to keep your heart healthy is to eat a balanced diet. Focus on incorporating fruits, vegetables, whole grains, lean proteins, and healthy fats into your daily meals. Reducing your intake of saturated fats, trans fats, and sodium will help lower your cholesterol levels and prevent high blood pressure.</p>
          <img src="/images/news/" alt="Healthy Diet" width="600" height="400">
          <p>Here are a few dietary guidelines to follow:</p>
          <ul>
            <li>Eat a variety of fruits and vegetables every day.</li>
            <li>Choose whole grains instead of refined grains.</li>
            <li>Opt for lean sources of protein such as chicken, fish, beans, and nuts.</li>
            <li>Limit processed foods and sugary beverages.</li>
          </ul>
    
          <h2>2. Exercise Regularly</h2>
          <p>Physical activity is essential for heart health. Regular exercise helps to strengthen the heart muscle, improve blood circulation, lower cholesterol levels, and control blood pressure. Aim for at least 150 minutes of moderate-intensity aerobic activity, such as brisk walking, cycling, or swimming, each week.</p>
          <img src="/images/exercise-for-heart.jpg" alt="Exercise for Heart" width="600" height="400">
          <p>Additionally, incorporating strength training exercises two days a week can help improve muscle tone and support overall cardiovascular function.</p>
          
          <h2>3. Manage Stress Effectively</h2>
          <p>Chronic stress can have a significant negative impact on your heart. It can increase your risk of high blood pressure, heart disease, and other health problems. Finding ways to manage stress, such as through relaxation techniques, meditation, or hobbies you enjoy, can significantly improve your heart health.</p>
          <p>Try incorporating some of these stress-reduction strategies into your daily routine:</p>
          <ul>
            <li>Practice deep breathing exercises or mindfulness meditation.</li>
            <li>Engage in activities that relax you, such as reading, gardening, or listening to music.</li>
            <li>Set aside time each day to unwind and focus on relaxation.</li>
          </ul>
    
          <h2>4. Don't Smoke and Limit Alcohol Consumption</h2>
          <p>Smoking is one of the leading causes of cardiovascular disease. It damages the blood vessels, raises blood pressure, and increases the risk of heart attacks and strokes. Quitting smoking is one of the best things you can do for your heart health.</p>
          <img src="/images/news/" alt="Smoking Cessation" width="600" height="400">
          <p>Limiting alcohol consumption is also important for heart health. Excessive drinking can raise your blood pressure, contribute to weight gain, and damage your heart muscle over time. It's recommended that women limit their alcohol intake to one drink per day, and men to two drinks per day.</p>
    
          <h2>5. Regular Check-ups and Monitoring</h2>
          <p>Regular visits to your healthcare provider are essential for monitoring your heart health. Early detection of risk factors such as high cholesterol, high blood pressure, or diabetes can lead to timely intervention and better management of your health. Make sure to get regular check-ups and screenings as recommended by your doctor.</p>
          <img src="/images/news/" alt="Heart Checkup" width="600" height="400">
          <p>Don't wait until symptoms appear—prevention and early intervention are key to long-term heart health.</p>
          
          <h2>Conclusion</h2>
          <p>By adopting these heart-healthy lifestyle habits, you can reduce your risk of heart disease and live a long, healthy life. Remember, it's never too late to start making healthy changes, and every small step counts toward improving your heart health. Whether you're just beginning your journey or have already made positive changes, continue to prioritize your heart health and make it a lifelong commitment.</p>
        `,
      is_tip: true,
      order: 0,
      createdAt: new Date(),
    },
    {
      slug: "how-to-improve-your-sleep-quality",
      title: "How to Improve Your Sleep Quality for Better Health",
      image: "/images/news/",
      description:
        "Learn how to improve your sleep quality with practical tips and habits that contribute to better health and overall well-being.",
      content: `
        <p>Getting enough quality sleep is crucial for good health. A lack of sleep can lead to a range of health problems, including heart disease, diabetes, and weakened immune function. In this article, we’ll explore practical tips to improve your sleep quality and establish healthier sleep habits.</p>
  
        <h2>1. Stick to a Consistent Sleep Schedule</h2>
        <p>One of the most important ways to improve your sleep quality is to maintain a consistent sleep schedule. Going to bed and waking up at the same time every day helps regulate your body’s internal clock, making it easier to fall asleep and wake up naturally. Aim for 7-9 hours of sleep each night, depending on your age and individual needs.</p>
        <p>Consistency is key, even on weekends. While it may be tempting to sleep in on weekends, try to avoid drastic changes to your sleep schedule, as this can disrupt your sleep cycle and make it harder to sleep during the week.</p>
  
        <h2>2. Create a Relaxing Bedtime Routine</h2>
        <p>Establishing a relaxing pre-sleep routine can signal to your body that it’s time to wind down and prepare for sleep. Activities such as reading, taking a warm bath, or practicing deep breathing exercises can help calm your mind and body. Avoid stimulating activities like watching TV or using electronic devices, as the blue light emitted by screens can interfere with your ability to fall asleep.</p>
        <p>Try to incorporate relaxing habits into your routine about 30-60 minutes before bedtime. This will help your body relax and signal that it's time for rest.</p>
  
        <h2>3. Make Your Sleep Environment Comfortable</h2>
        <p>Your sleep environment plays a significant role in the quality of your sleep. A quiet, cool, and dark room is ideal for restful sleep. Consider the following tips to optimize your sleep environment:</p>
        <ul>
          <li>Keep your room dark with blackout curtains or an eye mask to block out light.</li>
          <li>Maintain a cool room temperature, between 60 and 67°F (15-20°C), for optimal sleep.</li>
          <li>Minimize noise by using earplugs or a white noise machine if needed.</li>
        </ul>
        <p>By creating a comfortable, calming environment, you’ll be more likely to fall asleep faster and stay asleep longer.</p>
  
        <h2>4. Limit Caffeine and Alcohol Intake</h2>
        <p>Caffeine and alcohol can both negatively affect the quality of your sleep. Caffeine, a stimulant found in coffee, tea, and energy drinks, can keep you awake if consumed too close to bedtime. Similarly, while alcohol may help you fall asleep initially, it can disrupt the later stages of your sleep cycle, leading to poor-quality rest.</p>
        <p>To improve sleep quality, limit caffeine intake in the afternoon and evening, and avoid alcohol close to bedtime. A good rule of thumb is to stop consuming both substances at least 4-6 hours before you plan to sleep.</p>
  
        <h2>5. Exercise Regularly, but Not Too Close to Bedtime</h2>
        <p>Regular physical activity can help improve sleep quality by promoting relaxation and reducing stress. Aim to incorporate exercise into your daily routine, whether it’s walking, jogging, or yoga. Exercise helps regulate sleep patterns, reduces anxiety, and promotes a sense of calm that can help you sleep better.</p>
        <p>However, avoid vigorous exercise too close to bedtime, as it can increase adrenaline levels and make it harder to fall asleep. Aim to finish any intense exercise at least 3 hours before bed.</p>
  
        <h2>6. Seek Professional Help if Necessary</h2>
        <p>If you continue to struggle with sleep despite making lifestyle changes, it may be time to seek professional help. Chronic sleep issues such as insomnia or sleep apnea may require medical treatment. A healthcare provider can help diagnose underlying conditions and offer effective treatments to improve your sleep quality.</p>
        <p>Don’t hesitate to consult with a sleep specialist if you have ongoing sleep problems. Better sleep is possible with the right guidance and treatment.</p>
  
        <h2>Conclusion</h2>
        <p>Improving sleep quality requires making conscious lifestyle changes and creating a sleep-friendly environment. By following these tips, you can improve your sleep, boost your energy levels, and enhance your overall health. Remember that good sleep is an essential part of maintaining a healthy body and mind, so make it a priority in your life.</p>
      `,
      is_tip: false,
      order: 1,
      createdAt: new Date(),
    },
    {
      slug: "understanding-the-importance-of-mental-health",
      title: "Understanding the Importance of Mental Health for Well-being",
      image: "/images/news/",
      description:
        "Mental health plays a significant role in overall well-being. Learn why mental health matters and how you can take steps to improve it.",
      content: `
        <p>Mental health is just as important as physical health. While the stigma around mental health issues has been gradually reducing, many people still don’t understand the importance of mental well-being in their lives. Mental health affects how we think, feel, and act, and it is crucial for coping with life's challenges, building relationships, and functioning productively in society. In this article, we explore the significance of mental health and how you can take steps to improve it.</p>
  
        <h2>What is Mental Health?</h2>
        <p>Mental health refers to a person’s emotional, psychological, and social well-being. It affects how we handle stress, relate to others, and make decisions. Mental health is influenced by a variety of factors including genetics, environment, life experiences, and biological factors. Just like physical health, mental health can vary from person to person and can change over time. Everyone has mental health, and just like physical health, we all need to take care of it to lead a healthy and fulfilling life.</p>
  
        <h2>The Connection Between Mental Health and Physical Health</h2>
        <p>There is a strong link between mental health and physical health. When a person experiences mental health issues, such as stress, anxiety, or depression, it can also have a negative impact on their physical health. Mental health problems can lead to poor sleep, fatigue, and a weakened immune system. Chronic mental health conditions, if left untreated, can increase the risk of physical health problems, including cardiovascular disease, diabetes, and obesity.</p>
        <p>On the flip side, improving mental health can lead to better physical health. Regular exercise, healthy eating, and managing stress are all important for improving both mental and physical well-being.</p>
  
        <h2>How Mental Health Affects Daily Life</h2>
        <p>Mental health problems can significantly impact an individual’s daily life. Whether it’s anxiety, depression, or any other condition, mental health challenges can make it difficult to perform everyday activities such as working, studying, or even socializing. Mental health issues can also affect a person’s relationships with family and friends and may lead to feelings of isolation or loneliness.</p>
  
        <h2>Signs of Poor Mental Health</h2>
        <p>It’s important to recognize the signs of poor mental health early on so that you can seek help. Some common signs of mental health struggles include:</p>
        <ul>
          <li>Feeling sad, down, or hopeless for long periods of time</li>
          <li>Excessive worry or anxiety</li>
          <li>Loss of interest in activities once enjoyed</li>
          <li>Difficulty concentrating or making decisions</li>
          <li>Changes in eating or sleeping habits</li>
          <li>Withdrawing from social activities or relationships</li>
          <li>Experiencing frequent mood swings</li>
        </ul>
  
        <h2>Steps to Improve Mental Health</h2>
        <p>Taking care of your mental health is essential for leading a fulfilling life. Here are some steps you can take to improve your mental well-being:</p>
        <ul>
          <li><strong>Practice Self-Care:</strong> Taking time to care for your body and mind is crucial for maintaining good mental health. Self-care practices can include taking a relaxing bath, reading a book, or engaging in a hobby.</li>
          <li><strong>Exercise Regularly:</strong> Physical activity has been shown to have a positive impact on mental health. Exercise helps release endorphins, the body’s natural mood boosters, and reduces feelings of stress and anxiety.</li>
          <li><strong>Get Enough Sleep:</strong> Sleep is essential for mental health. Aim for 7-9 hours of quality sleep every night to improve mood, increase focus, and reduce stress.</li>
          <li><strong>Eat a Balanced Diet:</strong> Eating nutritious foods can improve both your physical and mental health. A well-balanced diet that includes fruits, vegetables, and healthy fats can have a positive impact on your mood and energy levels.</li>
          <li><strong>Talk to Someone:</strong> If you’re feeling overwhelmed, talking to someone you trust can be helpful. Don’t hesitate to reach out to a friend, family member, or professional to share your feelings and get support.</li>
          <li><strong>Seek Professional Help:</strong> If you’re struggling with mental health issues such as depression or anxiety, seeking professional help from a therapist or counselor is an important step towards recovery.</li>
        </ul>
  
        <h2>The Importance of Mental Health Awareness</h2>
        <p>Raising awareness about mental health is essential for reducing stigma and encouraging individuals to seek help when they need it. As more people talk openly about their mental health struggles, the more likely others will feel comfortable reaching out for support. Mental health awareness can also help improve access to resources and treatment for those who need it the most.</p>
  
        <h2>Conclusion</h2>
        <p>Mental health is an integral part of overall well-being. It influences every aspect of our lives, from our ability to work and study to how we interact with others. By understanding the importance of mental health and taking steps to improve it, we can lead happier, healthier, and more productive lives. Remember, taking care of your mental health is just as important as taking care of your physical health, and it’s never too late to seek help if you need it.</p>
      `,
      is_tip: true,
      order: 2,
      createdAt: new Date(),
    },
    {
      slug: "breaking-medical-research-discovery-for-heart-disease-treatment",
      title:
        "Breaking: Medical Research Discovery Could Revolutionize Heart Disease Treatment",
      image: "/images/news/",
      description:
        "New medical research has uncovered potential breakthroughs in heart disease treatment that could save millions of lives worldwide.",
      content: `
        <p>In a groundbreaking discovery, researchers have unveiled a new treatment for heart disease that could dramatically improve outcomes for millions of patients worldwide. This promising development, revealed in the latest edition of the *Journal of Cardiology*, has been hailed by experts as a significant step forward in the ongoing battle against one of the leading causes of death globally.</p>
  
        <h2>Overview of the Discovery</h2>
        <p>The study, conducted by a team of cardiologists and biologists, focused on an innovative approach to treating atherosclerosis, the condition that leads to the hardening and narrowing of the arteries. The researchers discovered that by using a targeted combination of medications and lifestyle changes, it may be possible to reverse the damage caused by this condition and even prevent heart attacks and strokes.</p>
  
        <p>"This discovery is a game-changer for patients suffering from heart disease," said Dr. Sarah Matthews, the lead researcher on the project. "For years, treatments have focused on managing symptoms, but this new method could actually address the root cause of heart disease, offering hope for a more effective and long-term solution."</p>
  
        <h2>The Science Behind the Breakthrough</h2>
        <p>The research team found that a combination of a novel drug, which targets specific receptors in the artery walls, and a personalized exercise regimen could significantly reduce the buildup of plaque in the arteries. The drug works by stimulating the body’s natural ability to clear fat deposits, while the exercise program helps to increase blood flow and improve heart function.</p>
  
        <p>This treatment approach differs from traditional methods, which focus solely on reducing cholesterol levels or controlling blood pressure. By addressing the core mechanisms of atherosclerosis, the new treatment could lead to more durable outcomes for patients who have not responded to conventional therapies.</p>
  
        <h2>What Does This Mean for Patients?</h2>
        <p>For heart disease patients, this discovery represents a beacon of hope. Currently, millions of people around the world live with atherosclerosis, often without realizing the severity of their condition until they experience a heart attack or stroke. With this new treatment, patients may be able to manage and even reverse the damage done to their cardiovascular system.</p>
  
        <p>The team’s findings are particularly significant for individuals who have been diagnosed with heart disease at a younger age or those who have a family history of cardiovascular problems. These patients may have more severe blockages and higher risks, but the new treatment could help them lead healthier lives, reducing their chances of developing further complications.</p>
  
        <h2>Next Steps in the Research</h2>
        <p>Although the results of the study are promising, the researchers emphasize that more clinical trials will be needed to confirm the long-term efficacy and safety of the treatment. The team is already planning to expand the study to include a larger sample of patients and test the therapy on individuals from diverse demographic backgrounds.</p>
  
        <p>“We are encouraged by the initial findings, but it is important that we continue testing this treatment across different populations to ensure it is effective for everyone,” Dr. Matthews explained. “We anticipate that it will take a few more years before this treatment becomes widely available, but we are optimistic about its potential.”</p>
  
        <h2>Impact on Global Health</h2>
        <p>This discovery has the potential to reshape the future of heart disease treatment and could have a profound impact on global health. Heart disease is responsible for approximately 17 million deaths worldwide each year, making it one of the leading causes of mortality across the globe. By offering a more effective treatment option, researchers hope to reduce the burden of heart disease and improve quality of life for millions of people.</p>
  
        <p>Additionally, the treatment may help reduce healthcare costs associated with heart disease, which places a significant financial strain on healthcare systems worldwide. According to recent estimates, the economic burden of cardiovascular disease is expected to rise to $1 trillion annually by 2030. This new approach could help mitigate those costs by reducing hospitalizations and long-term medical care for patients.</p>
  
        <h2>Conclusion</h2>
        <p>The discovery of this new treatment for heart disease is a significant milestone in medical research. While further trials are needed, the potential for improving outcomes for heart disease patients is immense. As researchers continue to refine the treatment and test its effectiveness, the global medical community is hopeful that this breakthrough will lead to a healthier future for those affected by heart disease.</p>
      `,
      is_tip: false,
      order: 3,
      createdAt: new Date(),
    },
    {
      slug: "new-breakthrough-in-cancer-treatment-paves-the-way-for-cure",
      title: "New Breakthrough in Cancer Treatment Paves the Way for Cure",
      image: "/images/news/",
      description:
        "A new, promising breakthrough in cancer research has raised hopes for a potential cure. Here’s what it means for the future of cancer treatment.",
      content: `
        <p>In an unprecedented development, a team of scientists has discovered a potential cure for cancer, a disease that has long been one of the leading causes of death worldwide. This groundbreaking discovery, which was announced earlier this week, has the potential to change the way cancer is treated and offer hope to millions of patients who currently have limited treatment options.</p>
  
        <h2>The Discovery</h2>
        <p>For years, cancer researchers have been focused on developing treatments that target the genetic mutations that cause cancer. While progress has been made with therapies like chemotherapy and immunotherapy, these treatments have not been able to provide a cure for most forms of cancer. However, this new discovery may finally change that.</p>
  
        <p>The research, led by Dr. Emily Sanchez at the renowned Global Cancer Research Institute, involves a revolutionary approach to eradicating cancer cells at the genetic level. According to Dr. Sanchez, the discovery centers around a novel gene-editing technology that allows scientists to target and repair damaged DNA in cancer cells, preventing them from dividing and spreading.</p>
  
        <h2>How Does the New Treatment Work?</h2>
        <p>The treatment uses a specialized enzyme that can identify and bind to the mutated genes in cancer cells. Once bound, the enzyme delivers a molecular "repair kit" that corrects the genetic errors, effectively neutralizing the cancerous cells. The treatment has shown promising results in lab tests, with cancer cells being completely eradicated in several test cases.</p>
  
        <p>Unlike traditional chemotherapy, which kills both healthy and cancerous cells, this gene-editing method is highly targeted and only affects the cancerous cells, sparing healthy tissues. This significantly reduces the side effects that are typically associated with chemotherapy, such as nausea, hair loss, and fatigue.</p>
  
        <h2>Promising Early Results</h2>
        <p>Early trials of the treatment have shown exciting results, with patients reporting rapid reductions in tumor size and improved overall health. In one of the first clinical trials, a group of patients with advanced forms of lung cancer showed signs of remission within weeks of undergoing the gene-editing treatment.</p>
  
        <p>"We are cautiously optimistic about these results," Dr. Sanchez said. "This is the first time we have seen such rapid and consistent success with this type of treatment. However, we need more data to fully understand its long-term effects, and more trials are necessary before it becomes widely available."</p>
  
        <h2>Challenges and Next Steps</h2>
        <p>While the discovery is undoubtedly groundbreaking, there are still many challenges to overcome. One of the primary concerns is the cost of developing and distributing the treatment on a global scale. Gene-editing technologies are currently expensive, and producing them in large quantities could be a logistical and financial challenge.</p>
  
        <p>Additionally, more testing is required to ensure that the gene-editing treatment is safe for long-term use. Some experts have raised concerns about potential unintended genetic alterations, which could lead to other health issues. Dr. Sanchez and her team are working closely with regulatory bodies to ensure that all safety protocols are met before the treatment is made available to the public.</p>
  
        <h2>What This Means for Cancer Patients</h2>
        <p>If the treatment proves to be effective and safe, it could represent a monumental shift in cancer care. For the first time, cancer patients could have access to a treatment that not only stops the progression of the disease but potentially cures it altogether.</p>
  
        <p>For many cancer patients, this discovery brings renewed hope. "I have been battling cancer for years, and I've tried every treatment available," said one patient, a 47-year-old woman who participated in the trial. "I can hardly believe it, but my tumor is shrinking, and I feel better than I have in years."</p>
  
        <h2>Global Impact</h2>
        <p>If successful, this treatment could save millions of lives worldwide. Cancer is the second leading cause of death globally, responsible for an estimated 10 million deaths each year. With the potential to cure or significantly reduce cancer, this breakthrough could reduce the global cancer burden and improve quality of life for millions of individuals.</p>
  
        <p>Moreover, this discovery could have implications for the treatment of other genetic diseases. Researchers are already looking into the possibility of adapting the technology to treat conditions like genetic disorders, autoimmune diseases, and even neurological disorders.</p>
  
        <h2>Conclusion</h2>
        <p>This breakthrough in cancer treatment is a monumental step forward in the fight against one of humanity's most formidable foes. While the journey to making this treatment widely available may take years, the results so far are incredibly promising. Cancer patients, doctors, and researchers alike are all hopeful that this discovery will lead to a future where cancer is no longer a death sentence, but a treatable, manageable condition.</p>
      `,
      is_tip: false,
      order: 4,
      createdAt: new Date(),
    },
  ];

  for (const news of newsAndTips) {
    await prisma.newsAndTips.create({
      data: {
        ...news,
      },
    });
  }

  const questionAnswers = [
    {
      question:
        "What is the process of booking an appointment at the medical center?",
      answer: `
        <p>To book an appointment at our medical center, follow these simple steps:</p>
        <ol>
          <li><strong>Visit our website:</strong> Go to the official website of the medical center.</li>
          <li><strong>Choose a doctor:</strong> Browse through our list of specialists and select the one that fits your needs.</li>
          <li><strong>Pick a date and time:</strong> Choose an available date and time slot from the calendar.</li>
          <li><strong>Fill in your details:</strong> Provide your personal information such as name, phone number, and any medical history that might be relevant.</li>
          <li><strong>Confirm the appointment:</strong> After entering your details, review your information and confirm the appointment.</li>
        </ol>
        <p>Once your appointment is confirmed, you will receive an email with the details. If you need to cancel or reschedule, you can do so directly through the website or by contacting our reception.</p>
      `,
      order: 0,
      createdAt: new Date(),
    },
    {
      question: "What services does the medical center offer?",
      answer: `
        <p>Our medical center provides a wide range of services to ensure comprehensive care for all our patients. These services include:</p>
        <ul>
          <li><strong>Cardiological Services:</strong> Diagnostic and therapeutic services for heart-related conditions.</li>
          <li><strong>Orthopedic Treatments:</strong> Treatment for bone, joint, and muscle conditions, including surgeries and rehabilitation.</li>
          <li><strong>Neurological Care:</strong> Diagnosis and treatment for brain and nervous system disorders.</li>
          <li><strong>General Medicine:</strong> Routine checkups, consultations, and management of general health issues.</li>
          <li><strong>Pediatric Care:</strong> Medical care for children, including immunizations and developmental check-ups.</li>
        </ul>
        <p>We also offer specialized services in cardiology, rehabilitation, diagnostic imaging, and much more. To learn more about each service, visit the "Our Services" page on our website.</p>
      `,
      order: 1,
      createdAt: new Date(),
    },
    {
      question: "What should I bring for my first visit to the medical center?",
      answer: `
        <p>When visiting our medical center for the first time, please make sure to bring the following:</p>
        <ul>
          <li><strong>Identification:</strong> A government-issued ID (e.g., passport, national ID card, or driver's license).</li>
          <li><strong>Insurance Information:</strong> If you have health insurance, bring your insurance card or any other relevant details.</li>
          <li><strong>Medical History:</strong> A list of any previous health conditions, surgeries, allergies, and medications you are currently taking.</li>
          <li><strong>Referral Letter:</strong> If you were referred by another doctor, please bring the referral letter or documents related to your condition.</li>
        </ul>
        <p>Bringing these items will help us to provide you with the best care and ensure that your first visit is as smooth as possible.</p>
      `,
      order: 2,
      createdAt: new Date(),
    },
    {
      question: "How can I cancel or reschedule my appointment?",
      answer: `
        <p>If you need to cancel or reschedule your appointment, you can do so in the following ways:</p>
        <ol>
          <li><strong>Online:</strong> Log in to your patient portal on our website, go to your appointments, and select the option to cancel or reschedule.</li>
          <li><strong>Phone:</strong> Call our reception at the phone number provided on the website, and our staff will assist you in rescheduling or canceling your appointment.</li>
          <li><strong>Email:</strong> Send an email to our appointment coordinator with your details and request a new time or date.</li>
        </ol>
        <p>We kindly ask that you cancel or reschedule at least 24 hours in advance to avoid any cancellation fees and to allow other patients to take the available slot.</p>
      `,
      order: 3,
      createdAt: new Date(),
    },
  ];

  for (const qa of questionAnswers) {
    await prisma.questionAnswers.create({
      data: {
        ...qa,
      },
    });
  }

  const hashedPassword = await bcrypt.hash("adminPassword123", 10);

  await prisma.user.create({
    data: {
      email: "human.aow.official@gmail.com",
      password: hashedPassword,
      isAdmin: true,
    },
  });

  console.log("Seed data added successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
