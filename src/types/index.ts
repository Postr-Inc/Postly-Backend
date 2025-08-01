 
/**
 * Enumeration for ranking scores.
 * 
 * This enum provides various constants that are used to adjust the recommendation score of a post based on different criteria.
 * Positive values represent boosts to the score, while negative values represent penalties.
 */
export enum Ranks {
    // Score boundaries
    minScore = -1,   // Minimum possible score
    maxScore = 1,    // Maximum possible score
    oldPostPenalty = 0.5,
    // Boosts
    /**
     * Boost for posts with multiple hashtags.
     */
    multipleHashtagsBoost = 0.05,

    /**
     * Posts get boosted 0.08 per like;
     */
    likesBoost = 0.08,
    /**
     * Posts that are state / city/ government crucial announcements get a 0.8 boost
     */
    crucialGovernmentAnnouncementBoost = 0.8,
    /**
     * Posts get boosted 4x per repost
     */
    repostsBoost = 0.04,

    /**
     * Boost for amount of people who have followed after seeing the post. (0.05 per follower)
     */
    followedAfterViewBoost = 0.05, // per follower
   
  
    /**
     * Boost for posts in English.
     */
    langEnglishBoost = 0.05,
  
    /**
     * Boost per 100 followers of the author.
     */
    authorFollowersBoost = 0.1,
  
    /**
     * Boost for posts containing media (images, videos).
     */
    hasMediaBoost = 0.1,
  
    /**
     * Boost for posts containing a link.
     */
    hasLinkBoost = 0.1,
  
    /**
     * Boost for posts with trending hashtags.
     */
    hasTrendingHashtagBoost = 0.1,
  
    // Penalties
    /**
     * Penalty for posts marked as NSFW (Not Safe For Work). - on postr nsfw is banned and automatically has a -1 which means no one will see it
     */
    isNSFWPenalty = -1,
  
    /**
     * Penalty per 100 mutes the author has received.
     */
    authorMutesPenalty = 0.1,
  
    /**
     * Penalty per 100 blocks the author has received.
     */
    authorBlocksPenalty = 0.2,
    /**
     * Penalty for posting content that does not match what your account type is.
     */
    outOfGroupPenalty = 0.5,
    /**
     * Penalty for posting content that doesnt meet what your account normally posts.
     */
    offTopicPenalty = 0.5,
    /**
     * Penalty for having links that are in the spam list.
     */
    spamLinksPenalty = 0.5,
    /**
     * Penalty for misInformative content.
     */
    misInformativePenalty = 0.5,
    /**
     * Penalty for grammar mistakes.
     */
    grammarMistakesPenalty = 0.01,

    /**
     * is 7 days old, grant posts higher ranking percentage for being new so that they can be seen!
     */

      is7daysOld = 0.5
  }
  
 
  export interface Post {
    author: string;
    content: string;
    type: string;
    files: string[];
    comments: string[];
    bookmarked: string[];
    pinned: boolean,
    likes: string[];
    mentioned: string[];
    shares: string[];
    whoCanSee:  "public" | "private" | "following";
    engaged: string[];
    profile_visited_after_view: string[];
    followed_after_profile_view: string[];
    related_topics: string[];
    isRepost: boolean;
    repost: string;
    hasPoll: boolean;
    pollEnds: string;
    pollVotes: string[];
    people_who_reposted: string[];
    blocks: string[];
    reportAsAbuse: string[];
    reportAsSpam: string[];
    isAd: boolean;
    End_Date_of_Ad: string;
    Publish_At: string;
    isNSFW: boolean;
    links: null | string[];
    rank: number;
    expand: {
        author:{
            [key: string] : any;
        }
    }
}
 
  