import { AttributeRule } from "./fields/attributeRule";
import { Audience, AudienceWithOptions } from "./fields/audience";
import { CancelAction } from "./fields/callbacks/cancelAction";
import { CloseAction } from "./fields/callbacks/closeAction";
import { ConfirmAction } from "./fields/callbacks/confirmAction";
import { OnInit } from "./fields/callbacks/onInit";
import { OnLoad } from "./fields/callbacks/onLoad";
import { CancelMessage } from "./fields/cancelMessage";
import { CancelShow } from "./fields/cancelShow";
import {
  ActionBackgroundColor,
  ActionTextColor,
  BackgroundColor,
  CancelBackgroundColor,
  CancelTextColor,
  CloseColor,
  FieldBackgroundColor,
  HeadlineColor,
  TextColor,
} from "./fields/colors";
import { DisplayConditions } from "./fields/displayConditions";
import {
  DateRangeEnd,
  DateRangeIndefinite,
  DateRangeStart,
} from "./fields/displayConditions/dateRange";
import { HideAfter } from "./fields/displayConditions/hideAfter";
import {
  HideAfterActionCancelHideCount,
  HideAfterActionCancelHideDuration,
  HideAfterActionClosedHideCount,
  HideAfterActionClosedHideDuration,
  HideAfterActionConfirmHideCount,
  HideAfterActionConfirmHideDuration,
} from "./fields/displayConditions/hideAfterAction";
import {
  ImpressionsGlobalDuration,
  ImpressionsGlobalSession,
  ImpressionsGlobalTotal,
  ImpressionsWidgetDuration,
  ImpressionsWidgetSession,
  ImpressionsWidgetTotal,
} from "./fields/displayConditions/impressions";
import { PageVisits } from "./fields/displayConditions/pageVisits";
import { ScrollPercentageToDisplay } from "./fields/displayConditions/scrollPercentageToDisplay";
import { ShowDelay } from "./fields/displayConditions/showDelay";
import { ShowOnExitIntent } from "./fields/displayConditions/showOnExitIntent";
import { URLContains } from "./fields/displayConditions/urlContains";
import { FormElements } from "./fields/formElements";
import { Headline } from "./fields/headline";
import { Image } from "./fields/image";
import { Layout, LayoutWithOptions } from "./fields/layout";
import { Message } from "./fields/msg";
import { OKLinkNewTab } from "./fields/okLinkNewTab";
import { OKLinkURL } from "./fields/okLinkURL";
import { OKMessage } from "./fields/okMessage";
import { OKShow } from "./fields/okShow";
import { OKShowLink } from "./fields/okShowLink";
import { Origin, OriginWithOptions } from "./fields/origin";
import {
  PersonalizationKey,
  PersonalizationKeyWithOptions,
} from "./fields/personalizationKeys";
import { Position, PositionWithOptions } from "./fields/position";
import { PositionSelector } from "./fields/positionSelector";
import { PushDown } from "./fields/pushDown";
import {
  ContentCollection,
  ContentCollectionWithOptions,
  ContentDisplayDescription,
  ContentDisplayDescriptionLimit,
  ContentDisplayImage,
  ContentDisplayTitle,
  ContentRank,
  ContentShuffle,
  ContentVisited,
} from "./fields/recommend";
import {
  TargetFlow,
  TargetFlowStep,
  TargetFlowStepWithOptions,
  TargetFlowVersion,
  TargetFlowVersionWithOptions,
  TargetFlowWithOptions,
} from "./fields/targetFlow";
import { TargetMethod } from "./fields/targetMethod";
import { Theme } from "./fields/theme";
import { Type } from "./fields/type";
import { WidgetDescription } from "./fields/widgetDescription";
import { WidgetSlug } from "./fields/widgetSlug";
import { WidgetStatus } from "./fields/widgetStatus";
import { WidgetTitle } from "./fields/widgetTitle";

export interface Field {
  id: string;
  label: string;
  description?: string;
  type: string;
  method: string;
  options?: SelectOption[];
  required?: boolean;
  hidden: boolean;
  support?: string[];
  render?: string;
  defaultValue?: any;
  dependencies?: {
    value: string | boolean;
    fieldsToShow?: string[];
    fieldsToDisable?: string[];
  }[];
  translate?: {
    render: string;
    renderValue: (value: any, config: any) => any;
  };
}

export interface Flow {
  label: string;
  value: string;
  versions: FlowVersion[];
}

export interface FlowVersion {
  version: number;
  steps: SelectOption[];
}

export interface SelectOption {
  label: string;
  value: string;
  type?: string;
}

export const type = Type;
export const headline = Headline;
export const layout = Layout;
export const layoutWithOptions = LayoutWithOptions;
export const theme = Theme;
export const backgroundColor = BackgroundColor;
export const textColor = TextColor;
export const headlineColor = HeadlineColor;
export const closeColor = CloseColor;
export const actionBackgroundColor = ActionBackgroundColor;
export const actionTextColor = ActionTextColor;
export const cancelBackgroundColor = CancelBackgroundColor;
export const cancelTextColor = CancelTextColor;
export const fieldBackgroundColor = FieldBackgroundColor;
export const message = Message;
export const okShow = OKShow;
export const okMessage = OKMessage;
export const okShowLink = OKShowLink;
export const okLinkURL = OKLinkURL;
export const okLinkNewTab = OKLinkNewTab;
export const cancelShow = CancelShow;
export const cancelMessage = CancelMessage;
export const image = Image;
export const position = Position;
export const positionWithOptions = PositionWithOptions;
export const origin = Origin;
export const originWithOptions = OriginWithOptions;
export const positionSelector = PositionSelector;
export const pushDown = PushDown;
export const widgetTitle = WidgetTitle;
export const widgetDescription = WidgetDescription;
export const widgetSlug = WidgetSlug;
export const widgetStatus = WidgetStatus;
export const displayConditions = DisplayConditions;
export const hideAfter = HideAfter;
export const pageVisits = PageVisits;
export const scrollPercentageToDisplay = ScrollPercentageToDisplay;
export const showDelay = ShowDelay;
export const showOnExitIntent = ShowOnExitIntent;
export const impressionsGlobalDuration = ImpressionsGlobalDuration;
export const impressionsGlobalSession = ImpressionsGlobalSession;
export const impressionsGlobalTotal = ImpressionsGlobalTotal;
export const impressionsWidgetDuration = ImpressionsWidgetDuration;
export const impressionsWidgetSession = ImpressionsWidgetSession;
export const impressionsWidgetTotal = ImpressionsWidgetTotal;
export const hideAfterActionClosedHideCount = HideAfterActionClosedHideCount;
export const hideAfterActionClosedHideDuration =
  HideAfterActionClosedHideDuration;
export const hideAfterActionConfirmHideCount = HideAfterActionConfirmHideCount;
export const hideAfterActionConfirmHideDuration =
  HideAfterActionConfirmHideDuration;
export const hideAfterActionCancelHideCount = HideAfterActionCancelHideCount;
export const hideAfterActionCancelHideDuration =
  HideAfterActionCancelHideDuration;
export const dateRangeStart = DateRangeStart;
export const dateRangeEnd = DateRangeEnd;
export const dateRangeIndefinite = DateRangeIndefinite;
export const urlContains = URLContains;
export const confirmAction = ConfirmAction;
export const cancelAction = CancelAction;
export const closeAction = CloseAction;
export const onInit = OnInit;
export const onLoad = OnLoad;
export const targetMethod = TargetMethod;
export const attributeRule = AttributeRule;
export const targetFlow = TargetFlow;
export const targetFlowVersion = TargetFlowVersion;
export const targetFlowVersionWithOptions = TargetFlowVersionWithOptions;
export const targetFlowWithOptions = TargetFlowWithOptions;
export const targetFlowStep = TargetFlowStep;
export const targetFlowStepWithOptions = TargetFlowStepWithOptions;
export const audience = Audience;
export const audienceWithOptions = AudienceWithOptions;
export const formElements = FormElements;
export const contentCollection = ContentCollection;
export const contentCollectionWithOptions = ContentCollectionWithOptions;
export const contentRank = ContentRank;
export const contentVisited = ContentVisited;
export const contentShuffle = ContentShuffle;
export const contentDisplayTitle = ContentDisplayTitle;
export const contentDisplayImage = ContentDisplayImage;
export const contentDisplayDescription = ContentDisplayDescription;
export const contentDisplayDescriptionLimit = ContentDisplayDescriptionLimit;
export const personalizationKey = PersonalizationKey;
export const personalizationKeyWithOptions = PersonalizationKeyWithOptions;

// display conditions
//   showOnInit
//   showOnMissingFields
//   displayWhenElementVisible
//   date
//   manualTrigger
//   metaContains
// responsive
