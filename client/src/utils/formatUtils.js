export const formatViewCount = (views) => {
  if (views < 1000) {
    return views.toString();
  } else if (views < 1000000) {
    return `${(views / 1000).toFixed(1).replace('.0', '')}K`;
  } else {
    return `${(views / 1000000).toFixed(1).replace('.0', '')}M`;
  }
};