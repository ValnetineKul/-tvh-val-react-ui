import {
  functionalIconsRootNodeId,
  functionalIconsPath,
  countryIconsPath,
  countryIconsRootNodeId,
  productCategoryIconsRootNodeId,
  productCategoryIconsPath,
  machineryIconsPath,
  machineryIconsRootNodeId,
  commercialIconsRootNodeId,
  commercialIconsPath,
  brandIconsPath,
  brandIconsRootNodeId,
} from './constants';
import { fetchIcons } from './services/fetchIcons';

const args = process.argv;

type FetchIconsKit = (isFullUpdate?: boolean, isForceUpdate?: boolean) => Promise<void>;

const fetchFunctionalIcons: FetchIconsKit = (isFullUpdate, isForceUpdate) =>
  fetchIcons({
    iconsPath: functionalIconsPath,
    iconsKitName: 'functional',
    iconsRootNodeId: functionalIconsRootNodeId,
    isFullUpdate,
    isForceUpdate,
  });

const fetchCountryIcons: FetchIconsKit = (isFullUpdate, isForceUpdate) =>
  fetchIcons({
    iconsPath: countryIconsPath,
    iconsKitName: 'country',
    iconsRootNodeId: countryIconsRootNodeId,
    isColored: true,
    isFullUpdate,
    isForceUpdate,
  });

const fetchProductCategoryIcons: FetchIconsKit = (isFullUpdate, isForceUpdate) =>
  fetchIcons({
    iconsPath: productCategoryIconsPath,
    iconsKitName: 'product category',
    iconsRootNodeId: productCategoryIconsRootNodeId,
    isFullUpdate,
    isForceUpdate,
  });

const fetchMachineryIcons: FetchIconsKit = (isFullUpdate, isForceUpdate) =>
  fetchIcons({
    iconsPath: machineryIconsPath,
    iconsKitName: 'machinery',
    iconsRootNodeId: machineryIconsRootNodeId,
    isFullUpdate,
    isForceUpdate,
  });

const fetchCommercialIcons: FetchIconsKit = (isFullUpdate, isForceUpdate) =>
  fetchIcons({
    iconsPath: commercialIconsPath,
    iconsKitName: 'commercial',
    iconsRootNodeId: commercialIconsRootNodeId,
    isFullUpdate,
    isForceUpdate,
  });

const fetchBrandIcons: FetchIconsKit = (isFullUpdate, isForceUpdate) =>
  fetchIcons({
    iconsPath: brandIconsPath,
    iconsKitName: 'brand',
    iconsRootNodeId: brandIconsRootNodeId,
    isFullUpdate,
    isForceUpdate,
  });

async function main() {
  const isFullUpdate = args.includes('-u') || args.includes('--update');
  const isForceUpdate = args.includes('--force');
  let hasFlag = false;

  // UPDATE FOR FUNCTIONAL ICONS
  if (args.includes('-f') || args.includes('--functional')) {
    hasFlag = true;
    await fetchFunctionalIcons(isFullUpdate, isForceUpdate);
  }

  // UPDATE FOR COUNTRY ICONS
  if (args.includes('-c') || args.includes('--country')) {
    hasFlag = true;
    await fetchCountryIcons(isFullUpdate, isForceUpdate);
  }

  // UPDATE FOR PRODUCT CATEGORY ICONS
  if (args.includes('-pc') || args.includes('--product-category')) {
    hasFlag = true;
    await fetchProductCategoryIcons(isFullUpdate, isForceUpdate);
  }

  // UPDATE FOR MACHINERY ICONS
  if (args.includes('-m') || args.includes('--machinery')) {
    hasFlag = true;
    await fetchMachineryIcons(isFullUpdate, isForceUpdate);
  }

  // UPDATE FOR COMMERCIAL ICONS
  if (args.includes('-com') || args.includes('--commercial')) {
    hasFlag = true;
    await fetchCommercialIcons(isFullUpdate, isForceUpdate);
  }

  // UPDATE FOR BRAND ICONS
  if (args.includes('-br') || args.includes('--brand')) {
    hasFlag = true;
    await fetchBrandIcons(isFullUpdate, isForceUpdate);
  }

  if (hasFlag) {
    return;
  }

  // UPDATE FOR ALL KITS
  await fetchFunctionalIcons(isFullUpdate, isForceUpdate);

  await fetchCountryIcons(isFullUpdate, isForceUpdate);

  await fetchProductCategoryIcons(isFullUpdate, isForceUpdate);

  await fetchMachineryIcons(isFullUpdate, isForceUpdate);

  await fetchCommercialIcons(isFullUpdate, isForceUpdate);

  await fetchBrandIcons(isFullUpdate, isForceUpdate);
}

main();
