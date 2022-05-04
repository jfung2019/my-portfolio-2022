export default {
  name: "project",
  title: "Project",
  type: "document",
  groups: [
    {
      name: "langdingPage",
      title: "Landing Page",
    },
    {
      name: "singleProjectPage",
      title: "Single Project Page",
    },
  ],
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "role",
      title: "Role",
      type: "blockContent",
    },
    {
      name: "slug",
      title: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "layout",
      title: "Layout",
      type: "string",
      group: "singleProjectPage",
    },
    {
      name: "demoUrl",
      title: "Demo Url",
      type: "string",
    },
    {
      name: "codeUrl",
      title: "Code Url",
      type: "string",
    },
    {
      name: "author",
      title: "Author",
      type: "reference",
      to: { type: "author" },
    },
    {
      name: "techUsed",
      title: "Tech Used",
      type: "array",
      of: [{ type: "string" }],
      group: "singleProjectPage",
    },
    {
      name: "mainImage",
      title: "Main image",
      type: "image",
      description: "Thumbnail for the project page listing",
      options: {
        hotspot: true,
      },
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    },
    {
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
    },
    {
      name: "body",
      title: "Body",
      type: "blockContent",
      description: "Background of the project",
      group: "singleProjectPage",
    },
    {
      title: "Featured?",
      name: "isFeatured",
      type: "boolean",
    },
    {
      name: "singleProjectImagePost",
      title: "Single Project Image Post",
      type: "string",
      group: "singleProjectPage",
      description: "this is used only in single project page"
    },
    {
      name: "projectData",
      title: "Project Data",
      group: "singleProjectPage",
      type: "array",
      of: [
        {
          title: "Single Project Data",
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "imageGalleryUrl",
              title: "Image Gallery Url",
              type: "array",
              description: "this is used only in single project page",
              of: [{ type: "string" }],
            },
            {
              name: "gifUrl",
              title: "Gif Url",
              type: "array",
              of: [{ type: "string" }],
            },
            {
              name: "videosUrl",
              title: "Videos url",
              type: "array",
              of: [{ type: "string" }],
            },
            {
              name: "paragraph",
              title: "Paragraph",
              type: "array",
              of: [{ type: "block" }],
            },
            {
              name: "date",
              title: "Date",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "conclusion",
      title: "Conclusion",
      type: "array",
      of: [{ type: "block" }],
    },
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      });
    },
  },
};
