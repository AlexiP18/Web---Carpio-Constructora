export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const ProyectosPartsFragmentDoc = gql`
    fragment ProyectosParts on Proyectos {
  __typename
  title
  slug
  description
  tags
  status
  category
  backgroundImage
  images
  virtualTourVideo
  location {
    __typename
    address
    city
    sector
    mapUrl
    lat
    lng
  }
  specifications {
    __typename
    bedrooms {
      __typename
      enabled
      value
      label
      sublabel
    }
    bathrooms {
      __typename
      enabled
      value
      label
      sublabel
    }
    area {
      __typename
      enabled
      value
      label
      sublabel
    }
    garden {
      __typename
      enabled
      value
      label
      sublabel
    }
    petFriendly {
      __typename
      enabled
      value
      label
      sublabel
    }
    deliveryDate {
      __typename
      enabled
      value
      label
    }
    customSpecs {
      __typename
      enabled
      icon
      label
      value
      sublabel
      colorScheme
    }
  }
  amenities
  features {
    __typename
    icon
    title
    description
  }
  testimonials {
    __typename
    name
    quote
    image
    unitType
  }
  seo {
    __typename
    metaTitle
    metaDescription
    ogImage
  }
  body
}
    `;
export const ServiciosPartsFragmentDoc = gql`
    fragment ServiciosParts on Servicios {
  __typename
  title
  slug
  subtitle
  description
  backgroundImage
  service {
    __typename
    name
    category
    tagline
    icon
    showFeatures
    showBenefits
    showProcess
    showTestimonials
    showFaqs
    showCta
    featuresTitle
    featuresDescription
    features {
      __typename
      title
      description
      icon
    }
    heroConfig {
      __typename
      backgroundImage
      subtitle
      ctaButton {
        __typename
        text
        whatsappNumber
        url
      }
      chips {
        __typename
        title
        description
        icon
        colorScheme
      }
    }
    gallery
    benefits {
      __typename
      icon
      title
      description
    }
    process {
      __typename
      step
      title
      description
    }
    testimonialsSection {
      __typename
      enabled
      title
      items {
        __typename
        name
        role
        quote
        image
      }
    }
    faqsSection {
      __typename
      enabled
      title
      items {
        __typename
        question
        answer
      }
    }
    ctaSection {
      __typename
      title
      description
      buttonText
      buttonLink
      backgroundImage
    }
  }
  body
}
    `;
export const CategoriasProyectosPartsFragmentDoc = gql`
    fragment CategoriasProyectosParts on CategoriasProyectos {
  __typename
  name
  slug
  description
  icon
  image
  order
  cloudinaryFolder
}
    `;
export const CategoriasServiciosPartsFragmentDoc = gql`
    fragment CategoriasServiciosParts on CategoriasServicios {
  __typename
  name
  slug
  description
  icon
  image
  order
  cloudinaryFolder
}
    `;
export const CloudinaryConfigPartsFragmentDoc = gql`
    fragment CloudinaryConfigParts on CloudinaryConfig {
  __typename
  cloudName
  baseFolder
  defaultTransformations {
    __typename
    imageWidth
    imageQuality
    imageFormat
  }
  folders {
    __typename
    proyectos
    servicios
    general
  }
}
    `;
export const PaginasPruebaPartsFragmentDoc = gql`
    fragment PaginasPruebaParts on PaginasPrueba {
  __typename
  title
  content
}
    `;
export const PaginasPartsFragmentDoc = gql`
    fragment PaginasParts on Paginas {
  __typename
  title
  slug
  published
  seo {
    __typename
    metaTitle
    metaDescription
    ogImage
  }
  sections {
    __typename
    ... on PaginasSectionsHero {
      title
      subtitle
      sliderImages
      showProjectsButton
      showServicesButton
      backgroundImage
      backgroundVideo
      ctaText
      ctaLink
      secondaryCtaText
      secondaryCtaLink
      alignment
      overlay
      animation {
        __typename
        enabled
        type
        duration
        delay
        easing
        stagger
      }
      sectionConfig {
        __typename
        id
        backgroundColor
        paddingTop
        paddingBottom
        fullWidth
        visible
      }
    }
    ... on PaginasSectionsAbout {
      title
      subtitle
      content
      image
      imagePosition
      showStats
      stats {
        __typename
        value
        label
      }
      ctaText
      ctaLink
      animation {
        __typename
        enabled
        type
        duration
        delay
        easing
        stagger
      }
      sectionConfig {
        __typename
        id
        backgroundColor
        paddingTop
        paddingBottom
        fullWidth
        visible
      }
    }
    ... on PaginasSectionsServices {
      title
      subtitle
      layout
      items {
        __typename
        title
        description
        icon
        image
        link
      }
      ctaText
      ctaLink
      animation {
        __typename
        enabled
        type
        duration
        delay
        easing
        stagger
      }
      sectionConfig {
        __typename
        id
        backgroundColor
        paddingTop
        paddingBottom
        fullWidth
        visible
      }
    }
    ... on PaginasSectionsProjects {
      title
      subtitle
      selectedProjects
      layout
      limit
      showFilters
      filterCategories
      ctaText
      ctaLink
      animation {
        __typename
        enabled
        type
        duration
        delay
        easing
        stagger
      }
      sectionConfig {
        __typename
        id
        backgroundColor
        paddingTop
        paddingBottom
        fullWidth
        visible
      }
    }
    ... on PaginasSectionsTestimonials {
      title
      subtitle
      layout
      items {
        __typename
        quote
        author
        position
        avatar
        rating
      }
      animation {
        __typename
        enabled
        type
        duration
        delay
        easing
        stagger
      }
      sectionConfig {
        __typename
        id
        backgroundColor
        paddingTop
        paddingBottom
        fullWidth
        visible
      }
    }
    ... on PaginasSectionsCta {
      title
      description
      backgroundImage
      buttonText
      buttonLink
      secondaryButtonText
      secondaryButtonLink
      style
      animation {
        __typename
        enabled
        type
        duration
        delay
        easing
        stagger
      }
      sectionConfig {
        __typename
        id
        backgroundColor
        paddingTop
        paddingBottom
        fullWidth
        visible
      }
    }
    ... on PaginasSectionsContact {
      title
      subtitle
      showEmailCard
      showSocialsCard
      showLocationCard
      showForm
      showMap
      showInfo
      info {
        __typename
        address
        phone
        email
        hours
      }
      mapUrl
      animation {
        __typename
        enabled
        type
        duration
        delay
        easing
        stagger
      }
      sectionConfig {
        __typename
        id
        backgroundColor
        paddingTop
        paddingBottom
        fullWidth
        visible
      }
    }
    ... on PaginasSectionsTeam {
      title
      subtitle
      layout
      members {
        __typename
        name
        position
        bio
        photo
        linkedin
        email
      }
      animation {
        __typename
        enabled
        type
        duration
        delay
        easing
        stagger
      }
      sectionConfig {
        __typename
        id
        backgroundColor
        paddingTop
        paddingBottom
        fullWidth
        visible
      }
    }
    ... on PaginasSectionsFaq {
      title
      subtitle
      items {
        __typename
        question
        answer
      }
      animation {
        __typename
        enabled
        type
        duration
        delay
        easing
        stagger
      }
      sectionConfig {
        __typename
        id
        backgroundColor
        paddingTop
        paddingBottom
        fullWidth
        visible
      }
    }
    ... on PaginasSectionsGallery {
      title
      subtitle
      layout
      columns
      images
      animation {
        __typename
        enabled
        type
        duration
        delay
        easing
        stagger
      }
      sectionConfig {
        __typename
        id
        backgroundColor
        paddingTop
        paddingBottom
        fullWidth
        visible
      }
    }
    ... on PaginasSectionsFeatures {
      title
      subtitle
      layout
      items {
        __typename
        title
        description
        icon
        image
      }
      animation {
        __typename
        enabled
        type
        duration
        delay
        easing
        stagger
      }
      sectionConfig {
        __typename
        id
        backgroundColor
        paddingTop
        paddingBottom
        fullWidth
        visible
      }
    }
    ... on PaginasSectionsContent {
      title
      body
      backgroundColor
      maxWidth
      animation {
        __typename
        enabled
        type
        duration
        delay
        easing
        stagger
      }
      sectionConfig {
        __typename
        id
        backgroundColor
        paddingTop
        paddingBottom
        fullWidth
        visible
      }
    }
    ... on PaginasSectionsSpacer {
      size
      showDivider
      animation {
        __typename
        enabled
        type
        duration
        delay
        easing
        stagger
      }
      sectionConfig {
        __typename
        id
        backgroundColor
        paddingTop
        paddingBottom
        fullWidth
        visible
      }
    }
  }
}
    `;
export const ConfiguracionGlobalPartsFragmentDoc = gql`
    fragment ConfiguracionGlobalParts on ConfiguracionGlobal {
  __typename
  company {
    __typename
    name
    slogan
    logo
    logoWhite
    logoIcon
    favicon
  }
  colors {
    __typename
    primary
    secondary
    accent
    background
    text
  }
  contact {
    __typename
    phone
    phoneSecondary
    whatsapp
    email
    emailSecondary
    hours
  }
  agents {
    __typename
    name
    phone
    phoneSecondary
    whatsapp
    email
    emailSecondary
    hours
  }
  locations {
    __typename
    main {
      __typename
      name
      address
      city
      province
      country
      postalCode
      phone
      email
      mapUrl
      mapEmbed
      lat
      lng
    }
    offices {
      __typename
      name
      address
      city
      province
      phone
      email
      hours
      mapUrl
      mapEmbed
      lat
      lng
      order
    }
  }
  socialNetworks {
    __typename
    name
    icon
    url
    showInHeader
    showInFooter
    order
  }
  header {
    __typename
    sticky
    transparent
    topBar {
      __typename
      show
      slogan
      showSocials
      showContact
    }
    showWhatsappButton
    showContactButton
    navigation {
      __typename
      label
      href
      order
      highlight
      type
      dropdownLimit
      children {
        __typename
        label
        href
        order
      }
    }
    ctaText
    ctaLink
  }
  footer {
    __typename
    phrase
    copyright
    servicesColumn {
      __typename
      label
      href
    }
    projectsColumn {
      __typename
      label
      href
    }
    companyColumn {
      __typename
      label
      href
    }
    socialAndContactColumn {
      __typename
      title
      socialLinks {
        __typename
        name
        url
        icon
      }
      phone
      email
      address
    }
    showLegalPages
    legalPagesLinks {
      __typename
      label
      href
    }
  }
  legal {
    __typename
    background {
      __typename
      type
      color
      image
    }
    cards {
      __typename
      icon
      title
      description
    }
    privacyPolicy {
      __typename
      enabled
      title
      slug
      lastUpdated
      content
    }
    termsOfService {
      __typename
      enabled
      title
      slug
      lastUpdated
      content
    }
    cookies {
      __typename
      enabled
      showBanner
      title
      slug
      bannerText
      acceptButtonText
      rejectButtonText
      settingsButtonText
      content
    }
  }
  seo {
    __typename
    defaultTitle
    titleTemplate
    defaultDescription
    defaultOgImage
    googleAnalyticsId
    googleTagManagerId
  }
}
    `;
export const ProyectosDocument = gql`
    query proyectos($relativePath: String!) {
  proyectos(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ProyectosParts
  }
}
    ${ProyectosPartsFragmentDoc}`;
export const ProyectosConnectionDocument = gql`
    query proyectosConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ProyectosFilter) {
  proyectosConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ProyectosParts
      }
    }
  }
}
    ${ProyectosPartsFragmentDoc}`;
export const ServiciosDocument = gql`
    query servicios($relativePath: String!) {
  servicios(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ServiciosParts
  }
}
    ${ServiciosPartsFragmentDoc}`;
export const ServiciosConnectionDocument = gql`
    query serviciosConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ServiciosFilter) {
  serviciosConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ServiciosParts
      }
    }
  }
}
    ${ServiciosPartsFragmentDoc}`;
export const CategoriasProyectosDocument = gql`
    query categoriasProyectos($relativePath: String!) {
  categoriasProyectos(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...CategoriasProyectosParts
  }
}
    ${CategoriasProyectosPartsFragmentDoc}`;
export const CategoriasProyectosConnectionDocument = gql`
    query categoriasProyectosConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: CategoriasProyectosFilter) {
  categoriasProyectosConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...CategoriasProyectosParts
      }
    }
  }
}
    ${CategoriasProyectosPartsFragmentDoc}`;
export const CategoriasServiciosDocument = gql`
    query categoriasServicios($relativePath: String!) {
  categoriasServicios(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...CategoriasServiciosParts
  }
}
    ${CategoriasServiciosPartsFragmentDoc}`;
export const CategoriasServiciosConnectionDocument = gql`
    query categoriasServiciosConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: CategoriasServiciosFilter) {
  categoriasServiciosConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...CategoriasServiciosParts
      }
    }
  }
}
    ${CategoriasServiciosPartsFragmentDoc}`;
export const CloudinaryConfigDocument = gql`
    query cloudinaryConfig($relativePath: String!) {
  cloudinaryConfig(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...CloudinaryConfigParts
  }
}
    ${CloudinaryConfigPartsFragmentDoc}`;
export const CloudinaryConfigConnectionDocument = gql`
    query cloudinaryConfigConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: CloudinaryConfigFilter) {
  cloudinaryConfigConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...CloudinaryConfigParts
      }
    }
  }
}
    ${CloudinaryConfigPartsFragmentDoc}`;
export const PaginasPruebaDocument = gql`
    query paginasPrueba($relativePath: String!) {
  paginasPrueba(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PaginasPruebaParts
  }
}
    ${PaginasPruebaPartsFragmentDoc}`;
export const PaginasPruebaConnectionDocument = gql`
    query paginasPruebaConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PaginasPruebaFilter) {
  paginasPruebaConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PaginasPruebaParts
      }
    }
  }
}
    ${PaginasPruebaPartsFragmentDoc}`;
export const PaginasDocument = gql`
    query paginas($relativePath: String!) {
  paginas(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PaginasParts
  }
}
    ${PaginasPartsFragmentDoc}`;
export const PaginasConnectionDocument = gql`
    query paginasConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PaginasFilter) {
  paginasConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PaginasParts
      }
    }
  }
}
    ${PaginasPartsFragmentDoc}`;
export const ConfiguracionGlobalDocument = gql`
    query configuracionGlobal($relativePath: String!) {
  configuracionGlobal(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ConfiguracionGlobalParts
  }
}
    ${ConfiguracionGlobalPartsFragmentDoc}`;
export const ConfiguracionGlobalConnectionDocument = gql`
    query configuracionGlobalConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ConfiguracionGlobalFilter) {
  configuracionGlobalConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ConfiguracionGlobalParts
      }
    }
  }
}
    ${ConfiguracionGlobalPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    proyectos(variables, options) {
      return requester(ProyectosDocument, variables, options);
    },
    proyectosConnection(variables, options) {
      return requester(ProyectosConnectionDocument, variables, options);
    },
    servicios(variables, options) {
      return requester(ServiciosDocument, variables, options);
    },
    serviciosConnection(variables, options) {
      return requester(ServiciosConnectionDocument, variables, options);
    },
    categoriasProyectos(variables, options) {
      return requester(CategoriasProyectosDocument, variables, options);
    },
    categoriasProyectosConnection(variables, options) {
      return requester(CategoriasProyectosConnectionDocument, variables, options);
    },
    categoriasServicios(variables, options) {
      return requester(CategoriasServiciosDocument, variables, options);
    },
    categoriasServiciosConnection(variables, options) {
      return requester(CategoriasServiciosConnectionDocument, variables, options);
    },
    cloudinaryConfig(variables, options) {
      return requester(CloudinaryConfigDocument, variables, options);
    },
    cloudinaryConfigConnection(variables, options) {
      return requester(CloudinaryConfigConnectionDocument, variables, options);
    },
    paginasPrueba(variables, options) {
      return requester(PaginasPruebaDocument, variables, options);
    },
    paginasPruebaConnection(variables, options) {
      return requester(PaginasPruebaConnectionDocument, variables, options);
    },
    paginas(variables, options) {
      return requester(PaginasDocument, variables, options);
    },
    paginasConnection(variables, options) {
      return requester(PaginasConnectionDocument, variables, options);
    },
    configuracionGlobal(variables, options) {
      return requester(ConfiguracionGlobalDocument, variables, options);
    },
    configuracionGlobalConnection(variables, options) {
      return requester(ConfiguracionGlobalConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "http://localhost:4001/graphql",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
