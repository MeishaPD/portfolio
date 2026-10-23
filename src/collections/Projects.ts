import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'featured', 'displayOrder'],
  },

  access: {
    read: () => true,
  },

  versions: {
    drafts: true,
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'category',
      type: 'text',
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'projectUrl',
      type: 'text',
    },
  ],
}
