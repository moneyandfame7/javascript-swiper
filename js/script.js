const wrapper = document.querySelector('.wrapper')

const pageSlider = new Swiper('.page', {
  //! свои классы
  wrapperClass: 'page__wrapper',
  slideClass: 'page__screen',

  //! вертикальный слайдер
  direction: 'vertical',

  //! кол-во слайдеров для показа
  slidesPerView: 'auto',

  IOSEdgeSwipeDetection: true,
  onTouchStart: function () {
    return false
  },
  //! параллакс
  parallax: true,

  keyboard: {
    // вкл-выкл
    enabled: true,

    onlyInViewport: true,

    pageUpDown: true,
  },
  mousewheel: {
    sensitivity: 1,
  },

  watchOverFlow: true,

  //! скорость слайдеров
  speed: 800,

  //! обновление свайпера
  observer: true,
  observeParents: true,
  observeSlideChildren: true,

  pagination: {
    el: '.page__pagination',
    type: 'bullets',
    clickable: true,
    bulletClass: 'page__bullet',
    bulletActiveClass: 'page__bullet_active',
  },
  scrollbar: {
    el: '.page__scroll',
    dragClass: 'page__drag-scroll',
    draggable: true,
  },
  //! откл. автоинициализацию
  init: false,

  //! события

  on: {
    // событие инициализации
    init: () => {
      menuSlider()
      setScrollType()
      wrapper.classList.add('_loaded')
    },

    // событие смены слайда
    slideChange: () => {
      menuSliderRemove()
      menuLinks[pageSlider.realIndex].classList.add('_active')
    },

    resize: () => {
      setScrollType()
    },
  },
})

const menuLinks = document.querySelectorAll('.menu__link')

const menuSlider = () => {
  if (menuLinks.length > 0) {
    menuLinks[pageSlider.realIndex].classList.add('_active')
    for (let i = 0; i < menuLinks.length; i++) {
      const menuLink = menuLinks[i]
      menuLink.addEventListener('click', (e) => {
        menuSliderRemove()
        pageSlider.slideTo(i, 800)
        menuLink.classList.add('_active')
        e.preventDefault()
      })
    }
  }
}

const menuSliderRemove = () => {
  let menuLinkActive = document.querySelector('.menu__link._active')
  if (menuLinkActive) {
    menuLinkActive.classList.remove('_active')
  }
}

const setScrollType = () => {
  if (wrapper.classList.contains('_free')) {
    wrapper.classList.remove('_free')
    pageSlider.params.freeMode.enabled = false
  }

  for (let i = 0; i < pageSlider.slides.length; i++) {
    const pageSlide = pageSlider.slides[i]
    const pageSlideContent = pageSlide.querySelector('.screen__content')
    if (pageSlideContent) {
      const pageSlideContentHeight = pageSlideContent.offsetHeight
      if (pageSlideContentHeight > window.innerHeight) {
        wrapper.classList.add('_free')
        pageSlider.params.freeMode.enabled = true

        break
      }
    }
  }
}

pageSlider.init()
