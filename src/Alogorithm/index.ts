import { Ranks, Post } from "../types";
//@ts-ignore
import spamLinks from "./data/spam.json";

export default class RecommendationAlgorithmHandler {
  data: Post[];
  totalPages: number;
  totalItems: number;
  cacheKey: string

  constructor(input: { items: [], totalPages: number, totalItems: number, cacheKey: string }) {
    this.data = input.items;
    this.totalPages = input.totalPages;
    this.totalItems = input.totalItems;
    this.cacheKey = input.cacheKey
  }

  process() {
    const recommended = this.data
      .map(post => this.evaluatePost(post))
      .filter(post => post.rank >= Ranks.minScore)
      .sort((a, b) => b.rank - a.rank);

    return {
      items: recommended,
      totalPages: Math.max(1, Math.ceil(recommended.length / this.totalPages)),
      totalItems: recommended.length,
      cacheKey: this.cacheKey
    };
  }

  evaluatePost(post: Post): Post {
    post.rank = 0;

    this.applyContentRank(post);
    this.applyAuthorPenalty(post);
    this.applySpamPenalty(post);
    this.applyEngagementBoosts(post);
    this.applyMetaPenalties(post);

    console.log(`Post ${post.id} ranked ${post.rank}`);
    return post;
  }

  applyContentRank(post: Post) {
    const ageDays = this.getPostAge(post);
    if (ageDays > 30) post.rank -= Ranks.oldPostPenalty ?? 0.5;
    if (ageDays <= 7) post.rank += Ranks.is7daysOld;

    post.rank += post.isRepost ? Ranks.repostsBoost : 0;
    if (post.files?.length) post.rank += Ranks.hasMediaBoost;
    if (post.isNSFW) post.rank -= Ranks.isNSFWPenalty;
  }

  applyAuthorPenalty(post: Post) {
    const author = post.expand?.author;

    if (author) {
      post.rank += Math.floor((author.followers?.length ?? 0) / 100) * Ranks.authorFollowersBoost;
      post.rank -= Math.floor((author.muted?.length ?? 0) / 100) * Ranks.authorMutesPenalty;

      if (!Array.isArray(author.TypeOfContentPosted) || author.TypeOfContentPosted.length === 0) {
        post.rank -= Ranks.offTopicPenalty;
      }
    }
  }

  applySpamPenalty(post: Post) {
    const hasSpam = post.links?.some(link => spamLinks.includes(link));
    if (hasSpam) {
      post.rank -= Ranks.spamLinksPenalty;
    } else if (post.links?.length) {
      post.rank += Ranks.hasLinkBoost;
    }
  }

  applyEngagementBoosts(post: Post) {
    post.rank += (post.likes?.length ?? 0) * Ranks.likesBoost;
    post.rank += (post.people_who_reposted?.length ?? 0) * Ranks.repostsBoost;
  }

  applyMetaPenalties(post: Post) {
    post.rank -= Math.floor((post.blocks?.length ?? 0) / 100) * Ranks.authorBlocksPenalty;
  }

  getPostAge(post: Post): number {
    return (Date.now() - new Date(post.created).getTime()) / (1000 * 60 * 60 * 24);
  }
}
