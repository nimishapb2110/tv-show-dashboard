import { onMounted, onUnmounted, ref, type Ref } from "vue";

const useHorizontalScroll = (
  rowRef: Ref<HTMLElement | null>,
  scrollDistance = 400
) => {
  const canScrollLeft = ref(false);
  const canScrollRight = ref(false);

  const updateScrollState = () => {
    if (!rowRef.value) return;

    const { scrollLeft, scrollWidth, clientWidth } = rowRef.value;

    canScrollLeft.value = scrollLeft > 0;
    canScrollRight.value = scrollLeft + clientWidth < scrollWidth;
  };

  const scrollLeft = () => {
    rowRef.value?.scrollBy({ left: -scrollDistance, behavior: "smooth" });
  };

  const scrollRight = () => {
    rowRef.value?.scrollBy({ left: scrollDistance, behavior: "smooth" });
  };

  onMounted(() => {
    rowRef.value?.addEventListener("scroll", updateScrollState);
    updateScrollState();
  });

  onUnmounted(() => {
    rowRef.value?.removeEventListener("scroll", updateScrollState);
  });

  return { canScrollLeft, canScrollRight, scrollLeft, scrollRight };
};

export default useHorizontalScroll;
