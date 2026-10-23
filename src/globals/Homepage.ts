import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',

  access: {
    read: () => true,
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'heroHeadline',
      type: 'textarea',
      required: true,
    },
    {
      name: 'heroDescription',
      type: 'textarea',
    },
    {
      name: 'heroPortrait',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'aboutHeading',
      type: 'text',
    },
    {
      name: 'aboutDescription',
      type: 'textarea',
    },
    {
      name: 'aboutPortrait',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'servicesHeading',
      type: 'textarea',
    },
    {
      name: 'services',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
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
      ],
    },
    {
      name: 'processHeading',
      type: 'textarea',
    },
    {
      name: 'processDescription',
      type: 'textarea',
    },
    {
      name: 'contactHeading',
      type: 'textarea',
    },
    {
      name: 'contactEmail',
      type: 'email',
    },
    {
      name: 'contactPortrait',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
