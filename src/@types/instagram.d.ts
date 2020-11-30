type TInstagramApi = {
  logging_page_id: string;
  show_suggested_profiles: boolean;
  show_follow_dialog: boolean;
  graphql: {
    user: {
      biography: string;
      blocked_by_viewer: boolean;
      restricted_by_viewer: object;
      country_block: boolean;
      external_url: string;
      external_url_linkshimmed: string;
      edge_followed_by: TCount;
      followed_by_viewer: boolean;
      edge_follow: TCount;
      follows_viewer: boolean;
      full_name: string;
      has_ar_effects: boolean;
      has_clips: boolean;
      has_guides: boolean;
      has_channel: boolean;
      has_blocked_viewer: boolean;
      highlight_reel_count: number;
      has_requested_viewer: boolean;
      id: string;
      is_business_account: true;
      is_joined_recently: boolean;
      business_category_name: string;
      overall_category_name: any;
      category_enum: string;
      is_private: boolean;
      is_verified: boolean;
      edge_mutual_followed_by: {
        count: number;
        edges: any;
      };
      profile_pic_url: string;
      profile_pic_url_hd: string;
      requested_by_viewer: boolean;
      username: string;
      connected_fb_page: any;
      edge_felix_video_timeline: TTimeLine;
      edge_owner_to_timeline_media: TTimeLine;
      edge_saved_media: TTimeLine;
      edge_media_collections: TTimeLine;
      edge_related_profiles: {
        edges: any;
      };
    };
  };
  toast_content_on_load: any;
  show_view_shop: boolean;
  profile_pic_edit_sync_props: any;
};

type TTimeLine = {
  count: number;
  page_info: {
    has_next_page: boolean;
    end_cursor: string;
  };
  edges: Array<TEdge>;
};

type TEdge = {
  node: TNode;
};

type TNode = TNodeBase & {
  edge_media_to_caption: {
    edges: [
      {
        node: {
          text: string;
        };
      }
    ];
  };
  edge_media_to_comment: TCount;
  comments_disabled: boolean;
  taken_at_timestamp: number;
  edge_liked_by: TCount;
  edge_media_preview_like: TCount;
  location: any;
  thumbnail_src: string;
  thumbnail_resources: Array<TResource>;
  edge_sidecar_to_children?: {
    edges: Array<{ node: TNodeBase }>;
  };
};

type TCount = {
  count: number;
};

type TResource = {
  src: string;
  config_width: number;
  config_height: number;
};

type TNodeBase = {
  __typename: string;
  id: string;
  shortcode: string;
  dimensions: {
    width: number;
    height: number;
  };
  display_url: string;
  edge_media_to_tagged_user: {
    edges: any;
  };
  fact_check_overall_rating: any;
  fact_check_information: any;
  gating_info: any;
  sharing_friction_info: {
    should_have_sharing_friction: boolean;
    bloks_app_url: any;
  };
  media_overlay_info: any;
  media_preview: string;
  owner: {
    id: string;
    username: string;
  };
  is_video: boolean;
  accessibility_caption: string;
} & TNodeVideo;

type TNodeVideo = {
  dash_info: {
    is_dash_eligible: boolean;
    video_dash_manifest: any;
    number_of_qualities: number;
  };
  has_audio: true;
  tracking_token: string;
  video_url: string;
  video_view_count: number;
  //
  felix_profile_grid_crop: any;
  product_type: string;
};
