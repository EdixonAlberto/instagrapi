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
      is_business_account: boolean;
      is_joined_recently: boolean;
      business_category_name: string;
      overall_category_name: any;
      category_enum: string;
      is_private: boolean;
      is_verified: boolean;
      edge_mutual_followed_by: {
        count: number;
        edges: Array<any>;
      };
      profile_pic_url: string;
      profile_pic_url_hd: string;
      requested_by_viewer: boolean;
      username: string;
      connected_fb_page: any;
      edge_felix_video_timeline: any;
      edge_owner_to_timeline_media: TTimeLine;
      edge_saved_media: any;
      edge_media_collections: any;
      edge_related_profiles: {
        edges: Array<any>;
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
  edge_media_to_caption: TCaption;
  edge_media_to_comment: TCount;
  comments_disabled: boolean;
  taken_at_timestamp: number;
  edge_liked_by: TCount;
  edge_media_preview_like: TCount;
  location: {
    id: string;
    has_public_page: boolean;
    name: string;
    slug: string;
  } | null;
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
  dimensions: TDimensions;
  display_url: string;
  edge_media_to_tagged_user: {
    edges: Array<any>;
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
  has_audio: boolean;
  tracking_token: string;
  video_url: string;
  video_view_count: number | null;
  //
  felix_profile_grid_crop: any | null;
  product_type: string;
};

type TPostApi = {
  graphql: {
    shortcode_media: {
      __typename: string;
      id: string;
      shortcode: string;
      dimensions: TDimensions;
      gating_info: any;
      fact_check_overall_rating: any;
      fact_check_information: any;
      sensitivity_friction_info: any;
      sharing_friction_info: {
        should_have_sharing_friction: false;
        bloks_app_url: any;
      };
      media_overlay_info: any;
      media_preview: string;
      display_url: string;
      display_resources: Array<TResource>;
      accessibility_caption?: string;
      dash_info?: {
        is_dash_eligible: boolean;
        video_dash_manifest: any;
        number_of_qualities: number;
      };
      has_audio?: boolean;
      video_url?: string;
      video_view_count?: number;
      video_play_count?: number;
      is_video: boolean;
      tracking_token: string;
      edge_media_to_tagged_user: Array<{
        node: TMediaToTaggedUser;
      }>;
      edge_media_to_caption: TCaption;
      caption_is_edited: boolean;
      has_ranked_comments: boolean;
      edge_media_to_parent_comment: TMediaToParentComment;
      edge_media_to_hoisted_comment: {
        edges: Array<any>;
      };
      edge_media_preview_comment: {
        count: number;
        edges: Array<TEdgeComment>;
      };
      comments_disabled: boolean;
      commenting_disabled_for_viewer: boolean;
      taken_at_timestamp: number;
      edge_media_preview_like: {
        count: number;
        edges: Array<any>;
      };
      edge_media_to_sponsor_user: {
        edges: Array<any>;
      };
      location: {
        id: string;
        has_public_page: boolean;
        name: string;
        slug: string;
        address_json: string;
      };
      viewer_has_liked: boolean;
      viewer_has_saved: boolean;
      viewer_has_saved_to_collection: boolean;
      viewer_in_photo_of_you: boolean;
      viewer_can_reshare: boolean;
      owner: {
        id: string;
        is_verified: boolean;
        profile_pic_url: string;
        username: string;
        blocked_by_viewer: boolean;
        restricted_by_viewer: any;
        followed_by_viewer: boolean;
        full_name: string;
        has_blocked_viewer: boolean;
        is_private: boolean;
        is_unpublished: boolean;
        requested_by_viewer: boolean;
        pass_tiering_recommendation: boolean;
        edge_owner_to_timeline_media: TCount;
        edge_followed_by: TCount;
      };
      is_ad: boolean;
      edge_web_media_to_related_media: {
        edges: Array<any>;
      };
      edge_sidecar_to_children?: {
        edges: Array<{
          node: TSidecarToChildren;
        }>;
      };
      encoding_status?: any;
      is_published?: boolean;
      product_type?: string;
      title?: string;
      video_duration?: number;
      thumbnail_src?: string;
      clips_music_attribution_info?: {
        artist_name: string;
        song_name: string;
        uses_original_audio: boolean;
        should_mute_audio: boolean;
      };
      edge_related_profiles: {
        edges: Array<any>;
      };
    };
  };
};

type TMediaToTaggedUser = {
  user: {
    full_name: string;
    id: string;
    is_verified: boolean;
    profile_pic_url: string;
    username: string;
  };
  x: number;
  y: number;
};

type TSidecarToChildren = {
  __typename: string;
  id: string;
  shortcode: string;
  dimensions: TDimensions;
  gating_info: any;
  fact_check_overall_rating: any;
  fact_check_information: any;
  sensitivity_friction_info: any;
  sharing_friction_info: {
    should_have_sharing_friction: boolean;
    bloks_app_url: any;
  };
  media_overlay_info: any;
  media_preview: string;
  display_url: string;
  display_resources: Array<TResource>;
  accessibility_caption: string;
  is_video: boolean;
  tracking_token: string;
  edge_media_to_tagged_user: {
    edges: Array<{
      node: TMediaToTaggedUser;
    }>;
  };
};

type TMediaToParentComment = {
  count: number;
  page_info: {
    has_next_page: boolean;
    end_cursor: string;
  };
  edges: Array<TEdgeComment>;
};

type TEdgeComment = {
  node: TCommentBase;
};

type TCommentBase = {
  id: string;
  text: string;
  created_at: number;
  did_report_as_spam: boolean;
  owner: {
    id: string;
    is_verified: boolean;
    profile_pic_url: string;
    username: string;
  };
  viewer_has_liked: boolean;
  edge_liked_by: TCount;
  is_restricted_pending: boolean;
  edge_threaded_comments: TEdgeThreaded | null;
};

type TEdgeThreaded = {
  count: number;
  page_info: {
    has_next_page: boolean;
    end_cursor: any;
  };
  edges: Array<TEdgeComment>;
};

type TDimensions = {
  height: number;
  width: number;
};

type TCaption = {
  edges: [
    {
      node: {
        text: string;
      };
    }
  ];
};

type TLocation = {
  street_address: string;
  zip_code: string;
  city_name: string;
  region_name: string;
  country_code: string;
  exact_city_match: boolean;
  exact_region_match: boolean;
  exact_country_match: boolean;
};
