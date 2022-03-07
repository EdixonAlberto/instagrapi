type TProfileApi = {
  seo_category_infos: Array<string[]>
  logging_page_id: string
  show_suggested_profiles: boolean
  graphql: {
    user: {
      biography: string
      blocked_by_viewer: boolean
      restricted_by_viewer: object
      country_block: boolean
      external_url: string
      external_url_linkshimmed: string
      edge_followed_by: TCount
      followed_by_viewer: boolean
      edge_follow: TCount
      follows_viewer: boolean
      full_name: string
      has_ar_effects: boolean
      has_clips: boolean
      has_guides: boolean
      has_channel: boolean
      has_blocked_viewer: boolean
      highlight_reel_count: number
      has_requested_viewer: boolean
      id: string
      is_business_account: boolean
      is_joined_recently: boolean
      business_category_name: string
      overall_category_name: any
      category_enum: string
      is_private: boolean
      is_verified: boolean
      edge_mutual_followed_by: {
        count: number
        edges: Array<any>
      }
      profile_pic_url: string
      profile_pic_url_hd: string
      requested_by_viewer: boolean
      username: string
      connected_fb_page: any
      edge_felix_video_timeline: any
      edge_owner_to_timeline_media: {
        count: number
        page_info: {
          has_next_page: boolean
          end_cursor: string
        }
        edges: Array<TEdgeMedia>
      }
      edge_saved_media: any
      edge_media_collections: any
      edge_related_profiles: {
        edges: Array<any>
      }
    }
  }
  toast_content_on_load: any | null
  show_view_shop: boolean
  profile_pic_edit_sync_props: {
    show_change_profile_pic_confirm_dialog: boolean
    show_profile_pic_sync_reminders: boolean
    identity_id: string
    remove_profile_pic_header: null
    remove_profile_pic_subtext: null
    remove_profile_pic_confirm_cta: null
    remove_profile_pic_cancel_cta: null
    is_business_central_identity: boolean
    change_profile_pic_actions_screen_header: Array<string>
    change_profile_pic_actions_screen_subheader: null
    change_profile_pic_actions_screen_upload_cta: Array<string>
    change_profile_pic_actions_screen_remove_cta: Array<string>
    change_profile_pic_actions_screen_cancel_cta: Array<string>
    change_profile_pic_header: null
    change_profile_pic_subtext: null
  }
  always_show_message_button_to_pro_account: boolean
}

type TPostApi = {
  items: [
    {
      taken_at: number
      pk: number
      id: string
      device_timestamp: number
      media_type: number
      code: string
      client_cache_key: string
      filter_type: number
      carousel_media_count?: number
      carousel_media?: Array<{
        id: string
        media_type: number
        image_versions2: {
          candidates: Array<TMediaApi>
        }
        original_width: number
        original_height: number
        video_versions?: Array<
          TMediaApi & {
            type: number
            id: string
          }
        >
        video_duration?: number
        is_dash_eligible: 1
        video_dash_manifest?: string
        video_codec?: string
        number_of_qualities: number
        pk: number
        carousel_parent_id: string
        usertags?: {
          in: Array<TTagApi>
        }
        commerciality_status: string
      }>
      is_unified_video: boolean
      location?: {
        pk: number
        short_name: string
        facebook_places_id: number
        external_source: string
        name: string
        address: string
        city: string
        has_viewer_saved: boolean
        lng: number
        lat: number
        is_eligible_for_guides: boolean
      }
      lat?: number
      lng?: number
      user: TUserApi & {
        friendship_status: {
          following: boolean
          outgoing_request: boolean
          is_bestie: boolean
          is_restricted: boolean
          is_feed_favorite: boolean
        }
        has_anonymous_profile_picture: boolean
        is_unpublished: boolean
        is_favorite: boolean
        latest_reel_media: number
        has_highlight_reels: boolean
      }
      can_viewer_reshare: boolean
      caption_is_edited: boolean
      like_and_view_counts_disabled: boolean
      featured_products_cta: any | null
      commerciality_status: string
      is_paid_partnership: boolean
      is_visual_reply_commenter_notice_enabled: boolean
      original_media_has_visual_reply_media: boolean
      comment_likes_enabled: boolean
      comment_threading_enabled: boolean
      has_more_comments: boolean
      next_max_id: number
      max_num_visible_preview_comments: number
      preview_comments: TCommentsApi
      comments: TCommentsApi
      can_view_more_preview_comments: boolean
      comment_count: number
      hide_view_all_comment_entrypoint: boolean
      inline_composer_display_condition: string
      image_versions2?: {
        candidates: Array<TMediaApi>
        additional_candidates: {
          igtv_first_frame: TMediaApi
          first_frame: TMediaApi
        }
        animated_thumbnail_spritesheet_info_candidates: {
          default: {
            video_length: number
            thumbnail_width: number
            thumbnail_height: number
            thumbnail_duration: number
            sprite_urls: Array<string>
            thumbnails_per_row: number
            total_thumbnail_num_per_sprite: number
            max_thumbnails_per_sprite: number
            sprite_width: number
            sprite_height: number
            rendered_width: number
            file_size_kb: number
          }
        }
      }
      original_width: number
      original_height: number
      like_count: number
      fb_like_count: number
      has_liked: boolean
      top_likers: any[]
      facepile_top_likers: any[]
      photo_of_you: boolean
      usertags?: {
        in: Array<TTagApi>
      }
      is_organic_product_tagging_eligible: boolean
      can_see_insights_as_brand: boolean
      is_dash_eligible: 1
      video_dash_manifest?: string
      video_codec?: string
      number_of_qualities: number
      video_versions?: Array<
        TMediaApi & {
          type: number
          id: string
        }
      >
      has_audio?: boolean
      video_duration?: number
      view_count?: number
      play_count: number
      fb_play_count: number
      caption: {
        pk: number
        user_id: number
        text: string
        type: number
        created_at: number
        created_at_utc: number
        content_type: string
        status: string
        bit_flags: number
        did_report_as_spam: boolean
        share_enabled: boolean
        user: TUserApi & {
          friendship_status: {
            following: boolean
            outgoing_request: boolean
            is_bestie: boolean
            is_restricted: boolean
            is_feed_favorite: boolean
          }
          has_anonymous_profile_picture: boolean
          is_unpublished: boolean
          is_favorite: boolean
          latest_reel_media: number
          has_highlight_reels: boolean
        }
        is_covered: boolean
        media_id: number
        private_reply_status: number
      }
      coauthor_producers?: Array<TUserApi>
      coauthor_producer_can_see_organic_insights: any | null
      can_viewer_save: boolean
      organic_tracking_token: string
      sharing_friction_info: {
        should_have_sharing_friction: boolean
        bloks_app_url: string | null
      }
      comment_inform_treatment: {
        should_have_inform_treatment: boolean
        text: string
      }
      product_type: import('../entities/types').TVideo['type']
      is_in_profile_grid: boolean
      profile_grid_control_enabled: boolean
      deleted_reason: number
      integrity_review_decision: string
      music_metadata: any | null
      clips_metadata?: {
        music_info: {
          music_asset_info: {
            audio_cluster_id: string
            id: string
            title: string
            subtitle: string
            display_artist: string
            artist_id: string
            cover_artwork_uri: string
            cover_artwork_thumbnail_uri: string
            progressive_download_url: string // TODO: audio descargable
            reactive_audio_download_url: any | null
            fast_start_progressive_download_url: string
            web_30s_preview_download_url: any | null
            highlight_start_times_in_ms: Array<number>
            is_explicit: boolean
            dash_manifest: null
            has_lyrics: boolean
            audio_asset_id: string
            duration_in_ms: number
            dark_message: any | null
            allows_saving: boolean
            territory_validity_periods: any | {}
          }
          music_consumption_info: {
            ig_artist: TUserApi
            placeholder_profile_pic_url: string
            should_mute_audio: boolean
            should_mute_audio_reason: Array<string>
            should_mute_audio_reason_type: string
            is_bookmarked: boolean
            overlap_duration_in_ms: number
            audio_asset_start_time_in_ms: number
            allow_media_creation_with_music: boolean
            is_trending_in_clips: boolean
            formatted_clips_media_count: any | null
            streaming_services: any | null
            display_labels: any | null
          }
          push_blocking_test: any | null
        } | null
        original_sound_info: {
          audio_asset_id: number
          progressive_download_url: string
          dash_manifest: string
          ig_artist: TUserApi
          should_mute_audio: boolean
          original_media_id: number
          hide_remixing: boolean
          duration_in_ms: number
          time_created: number
          original_audio_title: Array<string>
          consumption_info: {
            is_bookmarked: boolean
            should_mute_audio_reason: string
            is_trending_in_clips: boolean
            should_mute_audio_reason_type: null
          }
          allow_creator_to_rename: boolean
          can_remix_be_shared_to_fb: boolean
          formatted_clips_media_count: null
          audio_parts: any[]
          is_explicit: boolean
          original_audio_subtype: string
          is_audio_automatically_attributed: boolean
        } | null
        audio_type: string
        music_canonical_id: string
        featured_label: any | null
        mashup_info: {
          mashups_allowed: boolean
          can_toggle_mashups_allowed: boolean
          has_been_mashed_up: boolean
          formatted_mashups_count: any | null
          original_media: any | null
          non_privacy_filtered_mashups_media_count: number
        }
        nux_info: any | null
        viewer_interaction_settings: any | null
        branded_content_tag_info: {
          can_add_tag: boolean
        }
        shopping_info: any | null
        additional_audio_info: {
          additional_audio_username: any | null
          audio_reattribution_info: {
            should_allow_restore: boolean
          }
        }
        is_shared_to_fb: boolean
        breaking_content_info: any | null
        challenge_info: any | null
        reels_on_the_rise_info: any | null
        breaking_creator_info: any | null
        asset_recommendation_info: any | null
        contextual_highlight_info: any | null
        clips_creation_entry_point: string
        audio_ranking_info: {
          best_audio_cluster_id: string
        }
        template_info: any | null
      }
      media_cropping_info: {
        feed_preview_crop: any | null
        square_crop: {
          crop_bottom: number
          crop_left: number
          crop_right: number
          crop_top: number
        }
      }
    }
  ]
  num_results: number
  more_available: boolean
  auto_load_more_enabled: boolean
}

type TMediaApi = {
  width: number
  height: number
  url: string
}

type TTagApi = {
  user: TUserApi & {
    friendship_status: {
      following: boolean
      followed_by: boolean
      blocking: boolean
      muting: boolean
      is_private: boolean
      incoming_request: boolean
      outgoing_request: boolean
      is_bestie: boolean
      is_restricted: boolean
      is_feed_favorite: boolean
      subscribed: boolean
      is_eligible_to_subscribe: boolean
    }
  }
  position: Array<number>
  start_time_in_video_in_sec: any | null
  duration_in_video_in_sec: any | null
}

type TUserApi = {
  pk: number
  username: string
  full_name: string
  is_private: boolean
  profile_pic_url: string
  profile_pic_id: string
  is_verified: boolean
  follow_friction_type: number
}

type TCommentsApi = Array<{
  pk: number
  user_id: number
  text: string
  type: number
  created_at: number
  created_at_utc: number
  content_type: string
  status: string
  bit_flags: number
  did_report_as_spam: boolean
  share_enabled: boolean
  user: TUserApi
  is_covered: boolean
  media_id: number
  has_liked_comment: boolean
  comment_like_count: number
  private_reply_status: number
}>

type TEdgeMedia = {
  node: TNodeMedia & {
    edge_media_to_caption: {
      edges: [
        {
          node: {
            text: string
          }
        }
      ]
    }
    edge_media_to_comment: TCount
    comments_disabled: boolean
    taken_at_timestamp: number
    edge_liked_by: TCount
    edge_media_preview_like: TCount
    location: null | {
      id: string
      has_public_page: boolean
      name: string
      slug: string
    }
    thumbnail_src: string
    thumbnail_resources: Array<{
      src: string
      config_width: number
      config_height: number
    }>
    edge_sidecar_to_children?: {
      edges: Array<{ node: TNodeMedia }>
    }
  }
}

type TNodeMedia = {
  __typename: string
  id: string
  shortcode: string
  dimensions: {
    height: number
    width: number
  }
  display_url: string
  edge_media_to_tagged_user: {
    edges: Array<{
      node: {
        user: {
          full_name: string
          id: string
          is_verified: boolean
          profile_pic_url: string
          username: string
        }
        x: number
        y: number
      }
    }>
  }
  fact_check_overall_rating: any
  fact_check_information: any
  gating_info: any
  sharing_friction_info: {
    should_have_sharing_friction: boolean
    bloks_app_url: any
  }
  media_overlay_info: any
  media_preview: string
  owner: {
    id: string
    username: string
  }
  is_video: boolean
  accessibility_caption: string | null
  dash_info?: {
    is_dash_eligible: boolean
    video_dash_manifest: any
    number_of_qualities: number
  }
  has_audio: boolean
  tracking_token?: string
  video_url: string
  title: string
  video_view_count: number | null
  felix_profile_grid_crop?: any | null
  product_type: string
}

type TCount = {
  count: number
}

/**
 * @deprecated
 *
type TPostApi = {
  graphql: {
    shortcode_media: {
      __typename: string
      id: string
      shortcode: string
      dimensions: TDimensions
      gating_info: any
      fact_check_overall_rating: any
      fact_check_information: any
      sensitivity_friction_info: any
      sharing_friction_info: {
        should_have_sharing_friction: boolean
        bloks_app_url: any
      }
      media_overlay_info: any
      media_preview: string
      display_url: string
      display_resources: Array<TResource>
      accessibility_caption: string | null
      dash_info?: {
        is_dash_eligible: boolean
        video_dash_manifest: any
        number_of_qualities: number
      }
      has_audio: boolean
      video_url: string
      video_view_count: number
      video_play_count?: number
      is_video: boolean
      tracking_token: string
      edge_media_to_tagged_user: {
        edges: Array<TEdgeTagged>
      }
      edge_media_to_caption: TCaption
      caption_is_edited: boolean
      has_ranked_comments: boolean
      edge_media_to_parent_comment: {
        count: number
        page_info: {
          has_next_page: boolean
          end_cursor: string
        }
        edges: Array<TEdgeComment>
      }
      edge_media_to_hoisted_comment: {
        edges: Array<any>
      }
      edge_media_preview_comment: {
        count: number
        edges: Array<TEdgeComment>
      }
      comments_disabled: boolean
      commenting_disabled_for_viewer: boolean
      taken_at_timestamp: number
      edge_media_preview_like: {
        count: number
        edges: Array<any>
      }
      edge_media_to_sponsor_user: {
        edges: Array<any>
      }
      location: null | {
        id: string
        has_public_page: boolean
        name: string
        slug: string
        address_json: string
      }
      viewer_has_liked: boolean
      viewer_has_saved: boolean
      viewer_has_saved_to_collection: boolean
      viewer_in_photo_of_you: boolean
      viewer_can_reshare: boolean
      owner: {
        id: string
        is_verified: boolean
        profile_pic_url: string
        username: string
        blocked_by_viewer: boolean
        restricted_by_viewer: any
        followed_by_viewer: boolean
        full_name: string
        has_blocked_viewer: boolean
        is_private: boolean
        is_unpublished: boolean
        requested_by_viewer: boolean
        pass_tiering_recommendation: boolean
        edge_owner_to_timeline_media: TCount
        edge_followed_by: TCount
      }
      is_ad: boolean
      edge_web_media_to_related_media: {
        edges: Array<any>
      }
      edge_sidecar_to_children?: {
        edges: Array<TEdgeSidecar>
      }
      encoding_status?: any
      is_published?: boolean
      product_type: string
      title: string
      video_duration: number
      thumbnail_src?: string
      clips_music_attribution_info: null | {
        artist_name: string
        song_name: string
        uses_original_audio: boolean
        should_mute_audio: boolean
      }
      edge_related_profiles: {
        edges: Array<any>
      }
    }
  }
}

type TEdgeComment = {
  node: {
    id: string
    text: string
    created_at: number
    did_report_as_spam: boolean
    owner: {
      id: string
      is_verified: boolean
      profile_pic_url: string
      username: string
    }
    viewer_has_liked: boolean
    edge_liked_by: TCount
    is_restricted_pending: boolean
    edge_threaded_comments?: {
      count: number
      page_info: {
        has_next_page: boolean
        end_cursor: any
      }
      edges: Array<TEdgeComment>
    }
  }
}

type TLocation = {
  street_address: string
  zip_code: string
  city_name: string
  region_name: string
  country_code: string
  exact_city_match: boolean
  exact_region_match: boolean
  exact_country_match: boolean
}
*/
