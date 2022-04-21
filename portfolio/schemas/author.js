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
    {
      name: "recomendationLetter",
      title: "Recomendation Letter",
      description: "Used in Landing page",
      group: 'langdingPage',
      type: "array",
      of: [{ type: "file" }],
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
      group: 'langdingPage',
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
