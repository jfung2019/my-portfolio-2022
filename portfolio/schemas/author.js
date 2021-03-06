export default {
  name: "author",
  title: "Author",
  type: "document",
  groups: [
    {
      name: 'langdingPage',
      title: 'Landing Page',
    },
    {
      name: 'aboutMe',
      title: 'About Me',
    },
    {
      name: 'projectPage',
      title: 'Project Page',
    },
    {
      name: 'blogPage',
      title: 'Blog Page',
    },
    {
      name: 'contactPage',
      title: 'Contact Page',
    },
  ],
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      group: 'langdingPage'
    },
    {
      name: "introOne",
      title: "Intro 1",
      type: "array",
      of: [{ type: "string" }],
      group: 'langdingPage'
    },
    {
      name: "introTwo",
      title: "Intro 2",
      type: "array",
      of: [{ type: "string" }],
      group: 'langdingPage'
    },
    {
      name: "introThree",
      title: "Intro 3",
      type: "array",
      of: [{ type: "string" }],
      group: 'langdingPage'
    },
    {
      name: "lastName",
      title: "Last Name",
      type: "string",
      group: 'langdingPage'
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      group: 'langdingPage'
    },
    {
      name: "resumeOrCV",
      title: "Resume or CV",
      description: "Used in Landing page",
      group: 'langdingPage',
      type: "file",
    },
    // {
    //   name: "recomendationLetter",
    //   title: "Recomendation Letter",
    //   description: "Used in Landing page",
    //   group: 'langdingPage',
    //   type: "array",
    //   of: [{ type: "file" }],
    // },
    {
      name: "recomendationLetter",
      title: "Recomendation Letter",
      description: "Used in Landing page",
      group: 'langdingPage',
      type: "file",
    },
    {
      name: "techSkills",
      title: "Tech Skills",
      description:
        "Get the link of images hosted from github and paste it here, order matters! (used in experience page in TechSkills conveyer belt)",
      type: "array",
      of: [{ type: "string" }],
      group: 'aboutMe'
    },
    {
      name: "contactTitle",
      title: "Contact Title",
      description: "Used in contact page",
      group: 'contactPage',
      type: "string",
    },
    {
      name: "contactSubTitle",
      title: "Contact SubTitle",
      description: "Used in contact page",
      group: 'contactPage',
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      group: 'contactPage',
    },
    {
      name: "phoneNumber",
      title: "PhoneNumber",
      type: "string",
      group: 'contactPage',
    },
    {
      name: "experience",
      title: "Experience",
      group: 'aboutMe',
      type: "array",
      of: [
        {
          title: "Experience",
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "subTitle",
              title: "SubTitle",
              type: "string",
            },
            {
              name: "date",
              title: "Date",
              type: "string",
            },
            {
              title: "Experience",
              name: "experience",
              type: "array",
              of: [{ type: "block" }],
            },
          ],
        },
      ],
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      group: 'langdingPage',
      description: "Used in landing page",
      options: {
        hotspot: true,
      },
    },
    {
      name: "bio",
      title: "Bio",
      type: "array",
      description: "Used in about me page",
      group: 'aboutMe',
      of: [
        {
          title: "Block",
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
        },
      ],
    },
    {
      name: "bioForProjectPage",
      title: "Bio Project Page",
      type: "array",
      description: "Used in Project Page",
      group: 'projectPage',
      of: [
        {
          title: "Block",
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
        },
      ],
    },
    {
      name: "bioForBlogPage",
      title: "Bio Project Page",
      type: "array",
      description: "Used in Blog Page",
      group: 'blogPage',
      of: [
        {
          title: "Block",
          type: "block",
          styles: [{ title: "Normal", value: "normal" }],
          lists: [],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
};
