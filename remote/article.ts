import { request } from '~/utils/request'

export interface GetRecommendArticleRes {
  /* */
  code: number;

  /* */
  data: {
    /*id */
    id: number;

    /*用户ID */
    userId: number;

    /*分类ID */
    categoryId: number;

    /*分类名称 */
    categoryName: string;

    /*标签 */
    tags: {
      /*id */
      id: number;

      /*名称 */
      name: string;

      /*文章数量 */
      articleNum: number;
    }[];

    /*封面 */
    cover: string;

    /*标题 */
    title: string;

    /*简介 */
    summary: string;

    /*内容 */
    content: string;

    /* */
    isRecommend: string;

    /*浏览量 */
    viewCount: number;

    /*点赞数 */
    likeCount: number;

    /*视频链接 */
    videoUrl: string;

    /*是否置顶 */
    isStick: string;

    /*创建时间 */
    createTime: Record<string, unknown>;
  }[];

  /* */
  msg: string;
}

/** 
 * 获得推荐文章
 * @returns
 */
export function getRecommendArticle() {
  return request.get('/app-api/blog/article/getRecommendArticle')
}

export interface GetArticlePageRes {
  code: number;
  data: {
    list: {
      id: number;
      userId: number;
      categoryId : number;
      categoryName : string;
      tags: {
        id: number;
        name: string;
        articleNum: number;
      }[];
      cover: string;
      title: string;
      summary: string;
      content: string;
      readType: number;
      password: string;
      isRecommend: number;
      isComment: number;
      isStick: number;
      isPublish: boolean;
      viewCount: number;
      likeCount: number;
      videoUrl: string;
      isHaveVideo: number;
      createTime: Record<string, unknown>;
    }[];
    total: number;
  };
  msg: string;
}

export interface GetArticlePageParams {
  userId?: string;
  categoryId?: string;
  tagId?: string;
  keyword?: string;
  pageNo?: number;
  pageSize?: number;
}

/** 
 * 获得文章分页
 * @param params 查询参数
 */
export function getArticlePage(params: GetArticlePageParams = {}) {
  return request.get('/app-api/blog/article/page', params)
}

export interface GetArticleRes {
  /* 响应码 */
  code: number;

  /* 响应数据 */
  data: {
    /* 文章ID */
    id: number;

    /* 用户ID */
    userId: number;

    /* 分类ID */
    categoryId: number;

    /* 分类名称 */
    categoryName: string;

    /* 标签列表 */
    tags: {
      /* 标签ID */
      id: number;

      /* 标签名称 */
      name: string;

      /* 文章数量 */
      articleNum: number;
    }[];

    /* 文章封面 */
    cover: string;

    /* 文章标题 */
    title: string;

    /* 文章简介 */
    summary: string;

    /* 文章内容 */
    content: string;

    /* 阅读方式 0无需验证 1：评论阅读 2：点赞阅读 3：扫码阅读 4:密码 */
    readType: number;

    /* 阅读密码 */
    password: string;

    /* 是否推荐[0:否，1:是] */
    isRecommend: number;

    /* 是否启用评论 */
    isComment: number;

    /* 是否置顶 */
    isStick: number;

    /* 是否发布 0：下架 1：发布 */
    isPublish: number;

    /* 浏览量 */
    viewCount: number;

    /* 点赞数 */
    likeCount: number;

    /* 视频链接 */
    videoUrl: string;

    /* 创建时间 */
    createTime: Record<string, unknown>;

    /*是否有隐藏资源 0：否 1：是 */
    isHaveHidden: number;
    /* */
    articleHiddenInfo: {
      /*是否有隐藏资源 */
      isHaveHiddenContent: boolean;

      /*隐藏资源是否已经解解锁 */
      isUnlock: boolean;

      /*隐藏资源没有解锁的时候显示的提示文案 */
      tips: string;

      /*隐藏资源内容 */
      hiddenContent: string;
    };
    /*视频弹幕信息,只有有视频的时候才显示 */
    danmuCommentVoList: {
      /* */
      duration: number;

      /* */
      id: number;

      /* */
      start: number;

      /* */
      txt: string;

      /* */
      style: {
        /* */
        color: string;

        /* */
        fontSize: string;

        /* */
        padding: string;
      };

      /* */
      mode: string;
    }[];

  };

  /* 响应消息 */
  msg: string;
}



/** 
 * 获取文章详情
 * @param id 文章ID
 * @returns Promise<GetArticleRes>
 */
export function getArticleById(id: number) {
  // return request.get(`/app-api/blog/article/get?id=${id}`);
  return request.get(`/app-api/blog/article/authGet?id=${id}`);
}



export interface ArchiveRes {
  /* */
  code: number;

  /* */
  data: {
    /* */
    categoryArchiveList: {
      /* */
      id: number;

      /* */
      name: string;

      /* */
      count: number;
    }[];

    /* */
    tagArchiveList: {
      /* */
      id: number;

      /* */
      name: string;

      /* */
      count: number;
    }[];
  };

  /* */
  msg: string;
}

/**
 * 文章归档页面
 * @returns
 */
export function archive() {
  return request.get(`/app-api/blog/article/archive`);
}
